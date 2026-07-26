import {findRulesByUser, 
    findById,
    createRule as createRuleRepo, 
    updateRule as updateRuleRepo, 
    removeRule as removeRuleRepo
} from "../repositories/availability.repository.js";

import {findExceptionsByUser, 
    findExceptionsById,
    createException as createExceptionRepo, 
    updateException as updateExceptionRepo, 
    removeException as removeExceptionRepo
} from "../repositories/availability.repository.js";
import { notFound ,conflict, forbidden  } from "../utils/api-error.js"; 
import { createAvailabilityRuleDto,
       updateAvailabilityRuleDto,
       CreateAvailabilityExceptionDto,
       updateAvailabilityExceptionDto } from "../dtos/availability.dto.js";

export async function listRules(userId: number) {

    const rules = await findRulesByUser(userId);
    return rules;
}

export async function createRule(userId: number,data: createAvailabilityRuleDto ) {

    const createdrule = await createRuleRepo(userId,data);
    return createdrule;
}
export async function updateRule(userId: number, ruleId: number, data: updateAvailabilityRuleDto ) {

    const rule = await findById(ruleId);
    if(!rule){
        throw notFound("Availability rule not found");
    }
    if(rule.userId !== userId){
        throw forbidden("You are not authorized to update this availability rule");
    }

    const updatedrule = await updateRuleRepo(ruleId,data);

    return updatedrule;
}


export async function removeRule(userId: number, ruleId: number) {

    const rule = await findById(ruleId);
    if(!rule){
        throw notFound("Availability rule not found");
    }
    if(rule.userId !== userId){
        throw forbidden("You are not authorized to remove this availability rule");
    }

    const removedrule = await removeRuleRepo(ruleId);

    return removedrule;
}

//adding Availbility exceptions


export async function listExceptions(userId: number) {

    const exceptions = await findExceptionsByUser(userId);
    return exceptions;
}

export async function createException(userId: number,data: CreateAvailabilityExceptionDto ) {

    const createdexception = await createExceptionRepo(userId,data);
    return createdexception;
}
export async function updateException(userId: number, exceptionId: number, data: updateAvailabilityExceptionDto ) {

    const exception = await findExceptionsById(exceptionId);

    if(!exception){
        throw notFound("Availability Exception not found");
    }
    if(exception.userId !== userId){
        throw forbidden("You are not authorized to update this availability exception");
    }

    const updatedexception = await updateExceptionRepo(exceptionId,data);

    return updatedexception;
}


export async function removeException(userId: number, exceptionId: number) {

     const exception = await findExceptionsById(exceptionId);

    if(!exception){
        throw notFound("Availability Exception not found");
    }
    if(exception.userId !== userId){
        throw forbidden("You are not authorized to update this availability exception");
    }

    const removedexception = await removeExceptionRepo(exceptionId);

    return removedexception;
}