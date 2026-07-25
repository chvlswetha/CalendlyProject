import { Router } from "express";
import { create, getById, listEventTypes as list,remove, update} from "../controllers/event-type.controller.js";
import { validate } from "../middleware/validate.js";
import {createEventTypeSchema , updateEventTypeSchema} from "../dtos/eventType.dto.js"
import { requireUserId } from "../middleware/require-user-id.js";

export const eventTypeRouter:Router = Router(); 

eventTypeRouter.use(requireUserId);

eventTypeRouter.get('/', list);  //navigates to controller

eventTypeRouter.get('/:id', getById);  //navigates to controller

eventTypeRouter.post('/', validate(createEventTypeSchema), create);  //navigates to controller

eventTypeRouter.patch('/:id', validate(updateEventTypeSchema), update);  //navigates to controller

eventTypeRouter.delete('/:id', remove);

