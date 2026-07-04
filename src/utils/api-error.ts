export class ApiError extends Error {
    readonly statusCode: number;
    readonly details?: unknown; // ? says it is optional, it may or may not be present

    constructor(statusCode: number, message: string, details?: unknown) { //with this constructor we can create object for this error class
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = "ApiError"; //this is the name of the error class
        Error.captureStackTrace(this, this.constructor); //this function will directly take to the place where the error is thrown, it will not go to the constructor of this class. It will directly take to the place where the error is thrown.
    }
}


export const badRequest = (message: string, details?: unknown) => new ApiError(400, message, details);
export const notFound = (message: string, details?: unknown) => new ApiError(404, message, details);    
export const internalServerError = (message = "internal Server Error") => new ApiError(500, message);
export const unauthorized = (message: string, details?: unknown) => new ApiError(401, message, details);
export const forbidden = (message: string, details?: unknown) => new ApiError(403, message, details);
export const conflict = (message: string, details?: unknown) => new ApiError(409, message, details);
