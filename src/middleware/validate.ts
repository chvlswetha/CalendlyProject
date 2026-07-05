
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { badRequest } from "../utils/api-error.js";

 export const validate = (schema: ZodSchema) =>
    (req: Request, _res: Response, next: NextFunction) => {

        const result = schema.safeParse(req.body);
        if(!result.success){
            throw badRequest('Validation failed', result.error.issues)
        }
        //if the validation passes
        req.body = result.data; //assign the validated data to req.body
        next(); //calling controller upon success
    
}
