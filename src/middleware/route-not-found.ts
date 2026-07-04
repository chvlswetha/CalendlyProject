import { Request, Response, NextFunction } from "express";
import { notFound } from "../utils/api-error.js";


export const routeNotFound = (req : Request, res: Response, next: NextFunction) => {
    next (notFound("Route Not Found")); //manually calling the next function with error object. This will be handled by error handler middleware.   
}