import {prisma} from '../config/database.js';

export async function findBookedByHostInRange(hostId: number, startDate : Date, endDate: Date){

    const bookedslots = await prisma.slot.findMany(
        {
            where:{
                hostId,

                startAt: {
                    gte:startDate,
                    lte:endDate,
                },
                status : "BOOKED"
            }
        }
    )
    return bookedslots;
}

export async function upsertAvailableSlot(hostId: number, eventTypeId: number, startAt : Date, endAt: Date){

            return prisma.slot.upsert({
                    where:{
                    eventTypeId_startAt_endAt: {
                        eventTypeId: eventTypeId,
                        startAt,
                        endAt,
                    }
                },
                create: {
                    hostId: hostId,
                    eventTypeId: eventTypeId,
                    startAt,
                    endAt,
                    status: 'AVAILABLE',
                },
                update:{
                    status: 'AVAILABLE',
                }

              });
}

export async function blockSlot(id : string){

    return prisma.slot.update({
                    where: { id } ,
                    data:{status: 'BLOCKED'},
    });
}

export async function findFutureSlotsByEvenetTypeInRange(  
    eventTypeId: number,
    startDate: Date,
    endDate: Date,
    ){

     return  prisma.slot.findMany({
            where: {
                eventTypeId,
                startAt: {gte : startDate, lte: endDate },
                status: {in: ['AVAILABLE', 'BLOCKED']},
            }
        });
 }