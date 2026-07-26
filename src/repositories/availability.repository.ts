import {prisma} from '../config/database.js';
import { createAvailabilityRuleDto, 
    updateAvailabilityRuleDto,
    CreateAvailabilityExceptionDto,
    updateAvailabilityExceptionDto } from '../dtos/availability.dto.js';
import { notFound } from '../utils/api-error.js';

export async function findRulesByUser(userId: number) {

    const rules = await prisma.availabilityRule.findMany({
        where : {userId},
    orderBy :[{weekday: "asc"}, {startTime : "asc"}]

});

return rules;

}

export async function findActiveRulesByUser(userId: number) {

    const active_rules = await prisma.availabilityRule.findMany({
        where : {userId, isActive: true},
    orderBy :[{weekday: "asc"}, {startTime : "asc"}]

});

return active_rules;
}

export async function findById(id : number) {

    const rule = await prisma.availabilityRule.findUnique({
        where : { id }
});

return rule;
}

export async function createRule(userId: number, data : createAvailabilityRuleDto){
    
    const rule = await prisma.availabilityRule.create({
        data: {
          userId,
         ...data   
       }
    });
    return rule;    
}

export async function updateRule(id: number , data: updateAvailabilityRuleDto){

    const rule = await prisma.availabilityRule.update({
        where: { id },
        data : data
    });
    return rule;
}
    
export async function removeRule(id: number){
    await prisma.availabilityRule.delete({
        where: { id } 
    });    
    
}  

//availability Exceptions

export async function findExceptionsByUser(userId: number) {

    const exceptions = await prisma.availabiltyException.findMany({
        where : {userId},
    orderBy :[{date : "asc"}]

});

return exceptions;

}

export async function findExceptionsById(id : number) {

    const exceptions = await prisma.availabiltyException.findUnique({
        where : { id }
});

return exceptions;
}

export async function createException(userId: number, data : CreateAvailabilityExceptionDto){
    
   const {date, ...rest} = data;
    const exception = await prisma.availabiltyException.create({
        data: {
          userId,
         ...rest,
         date: new Date('${date}T00:00:00.000Z')   
       }
    });
    return exception;    
}

export async function updateException(id: number , data: updateAvailabilityExceptionDto){

    const {date, ...rest} = data;
    const exception = await prisma.availabiltyException.update({
        where: { id },
        data : {
            ...rest,
            ...(date !== undefined && {date : new Date('${date}T00:00:00.000Z') })  
        }
    });
    return exception;
}
    
export async function removeException(id: number){
    await prisma.availabiltyException.delete({
        where: { id } 
    });    
    
}  

export async function findExceptionsByUserInRange(userId:number, startDate: Date ,endDate: Date)
{
    const exceptions = await prisma.availabiltyException.findMany({
        where: {
            userId,
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
        orderBy: { date: "asc" },
    });

    return exceptions;
}