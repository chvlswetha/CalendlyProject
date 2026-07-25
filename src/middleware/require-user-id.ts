import { NextFunction,Request,Response } from "express";
import { badRequest,unauthorized } from "../utils/api-error.js";


export function requireUserId(req: Request, _res : Response, next: NextFunction)
{
    const userIdHeader = req.headers['x-user-id'];

    if(!userIdHeader || typeof userIdHeader !== "string"){

        throw unauthorized('x-user-id header is required');
    }

    const userId = Number(userIdHeader);
    if(Number.isNaN(userId)){
        throw badRequest('x-user-id header must be a valid number');
    }

    //attaching the user id to expree Request object
    req.userId = userId;
    next();
}