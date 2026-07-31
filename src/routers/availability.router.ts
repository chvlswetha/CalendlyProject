import { Router } from "express";
import { listRules,
    createRule,
    updateRule,
    removeRule,
    listExceptions,
    createException,
    updateException,
    removeException
} from "../controllers/availability.controller.js";

import { validate } from "../middleware/validate.js";
import { createAvailabilityRuleSchema,
       updateAvailabilityRuleSchema,
       createAvailabilityExceptionSchema,
       updateAvailabilityExceptionSchema } from "../dtos/availability.dto.js";

import { requireUserId } from "../middleware/require-user-id.js";

export const availabilityRouter:Router = Router(); 

availabilityRouter.use(requireUserId);

availabilityRouter.get('/rules', listRules);  //navigates to controller
availabilityRouter.post('/rules', validate(createAvailabilityRuleSchema), createRule);  //navigates to controller
availabilityRouter.patch('/rules/:id', validate(updateAvailabilityRuleSchema), updateRule);  //navigates to controller
availabilityRouter.delete('/rules/:id', removeRule);


availabilityRouter.get('/exceptions', listExceptions);  //navigates to controller
availabilityRouter.post('/exceptions', validate(createAvailabilityExceptionSchema), createException);  //navigates to controller
availabilityRouter.patch('/exceptions/:id', validate(updateAvailabilityExceptionSchema), updateException);  //navigates to controller
availabilityRouter.delete('/exceptions/:id', removeException);

