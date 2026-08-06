import { DateTime } from "luxon";
import { prisma } from "../config/database.js";
import {SLOT_GENERATION_DAYS} from "../config/env.js"
import { findActiveRulesByUser, findExceptionsByUserInRange } from "../repositories/availability.repository.js";
import { findActiveEventTypesByHost } from "../repositories/event-type.repository.js";
import { findBookedByHostInRange } from "../repositories/slot.repository.js";
import { applyExceptionsForDate, TimeWindow, windowsForWeekdayRule, splitIntoSlots, overlapsBooked} from "./slot-generation.service.js";

export interface RegenerateHostSlotsInput{
    hostId: number;
    from?: string;
    to?: string;
}

export async function regenerateHostSlots(input: RegenerateHostSlotsInput){

    const host = await prisma.user.findUnique({ where: { id: input.hostId }});

    if(!host) return;

       // if the inputs from and date not given slorts get generated from today to 30 days for he hostid
    const from = input.from 
       ? DateTime.fromISO(input.from, {zone: 'utc'}).startOf('day') //2026-06-01  -> 2026-06-01T00:00:00:000Z
       : DateTime.now().startOf('day');  //satrt of day coverts the day at the 0th hour 0 min and 00 sec

    
    const to = input.to 
       ? DateTime.fromISO(input.to, {zone: 'utc'}).endOf('day')   //2026-06-01  -> 2026-06-01T23:59:59:999Z
       : from.plus({days: SLOT_GENERATION_DAYS}).endOf('day'); //end of day coverts the day at the 23rd hour 59 min and 59 sec


    const [rules, exceptions, eventTypes, bookedSlots] = await Promise.all([
        findActiveRulesByUser(input.hostId),
        findExceptionsByUserInRange(input.hostId, from.toJSDate(),to.toJSDate()),
        findActiveEventTypesByHost(input.hostId),
        findBookedByHostInRange(input.hostId, from.toJSDate(),to.toJSDate()),

    ]);

      //convert booked slots to TimeWindow interface , compatible with luxon
    const bookedWindows: TimeWindow[] = bookedSlots.map((slot) => {
        return {
            start: DateTime.fromJSDate(slot.startAt,{zone: 'utc'}),
            end: DateTime.fromJSDate(slot.endAt, {zone: 'utc'}),
        }
    });

    for(const eventType of eventTypes){

        const generatedValidSlotKeys = new Set<string>();

        for(let cursor = from; cursor <= to; cursor = cursor.plus({days: 1})){

            const dateKey = cursor.toISODate();
         //any exceptions for the given date
            const dayExceptions = exceptions.filter((ex) => DateTime.fromJSDate(ex.date,{zone : 'utc'}).toISODate() === dateKey);

            const dayExceptionsWithTimeZone = dayExceptions.map((ex) => ({
                type: ex.type,
                startTime : ex.startTime,
                endTime : ex.endTime,
                timeZone: ex.timezone,
            }));

            let windows: TimeWindow[] = [];

            //convert rules into Time Windows what are compatible with luxon
            for(const rule of rules){

                windows.push(...windowsForWeekdayRule(cursor,rule.weekday, rule.startTime, rule.endTime,rule.timezone));
            }
            
            //apply exceptions to windows
            windows = applyExceptionsForDate(cursor,windows, dayExceptionsWithTimeZone);

              const durationMinutes = eventType.durationMinutes ?? 30;
              const bufferBeforeMinutes = eventType.bufferBeforeMinutes ?? 0;
              const bufferAfterMinutes = eventType.bufferAfterMinutes ?? 0;


            const slots = splitIntoSlots(
            windows, //windows on which exception are applied
            durationMinutes,
            bufferBeforeMinutes,
            bufferAfterMinutes,
            ).filter(
                (slot) => slot.start > DateTime.utc() &&  !overlapsBooked(slot, bookedWindows, bufferBeforeMinutes, bufferAfterMinutes)
            );  //slots filtered to excelude past slots and slots that overlap with booked slots

              //This loop addtehse correct slots to DB.
            for(const slot of slots){

                const startAt = slot.start.toUTC().toJSDate();
                const endAt = slot.end.toUTC().toJSDate();

                const key = `${eventType.id}_${startAt.toISOString()}_${endAt.toISOString()}`;
                generatedValidSlotKeys.add(key);

                await prisma.slot.upsert({
                    where:{
                    eventTypeId_startAt_endAt: {
                        eventTypeId: eventType.id,
                        startAt,
                        endAt,
                    }
                },
                create: {
                    hostId: input.hostId,
                    eventTypeId: eventType.id,
                    startAt,
                    endAt,
                    status: 'AVAILABLE',
                },
                update:{
                    status: 'AVAILABLE',
                }

              })
            }

        }
    }
    

}

//Invalid Solts = All slots in DB - new slots.

