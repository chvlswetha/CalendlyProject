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
}