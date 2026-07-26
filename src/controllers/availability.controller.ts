import { Request, Response} from "express";
import { listRules as listRulesService, 
    createRule as createRuleService,
    updateRule as updateRuleService,
    removeRule as removeRuleService,
    listExceptions as listExceptionsService, 
    createException as createExceptionService,
    updateException as updateExceptionService,
    removeException as removeExceptionService,
} from "../services/availability.service.js";
import { sendSuccess } from "../utils/api-response.js";

export async function listRules(req : Request, res: Response) {  //Called from Router
    const rules = await listRulesService(req.userId);  //controller will call service
    //res.json(response); //gives the response back to router that is in app object
    sendSuccess(res, rules); //this function gives more structured response
}

export async function createRule(req: Request, res: Response) {  
   
    const rule = await createRuleService(req.userId,req.body);  // convert the string id to number to the service

    //res.json(response); //gives the response back to router that is in app object
    sendSuccess(res, rule,201, "Availability Rule successfully created"); //gives the response back to router that is in app object
}

export async function updateRule(req: Request, res: Response) {

    const {id} = req.params;
    const rule = await updateRuleService(req.userId, Number(id), req.body); //calls the service layer for dbcall
    sendSuccess(res,rule,200,'Availability Rule updated successfully '); 
  //  res.json();
}

export async function removeRule(req: Request, res: Response) {

    const {id} = req.params;
    const rule= await removeRuleService(req.userId, Number(id));
    sendSuccess(res,rule,200,'Availability Rule removed successfully');
}   



export async function listExceptions(req : Request, res: Response) {  //Called from Router
    const exceptions = await listExceptionsService(req.userId);  //controller will call service
    //res.json(response); //gives the response back to router that is in app object
    sendSuccess(res, exceptions); //this function gives more structured response
}

export async function createException(req: Request, res: Response) {  
   
    const exception = await createExceptionService(req.userId,req.body);  // convert the string id to number to the service

    //res.json(response); //gives the response back to router that is in app object
    sendSuccess(res, exception, 201, "Availability Exception successfully created"); //gives the response back to router that is in app object
}

export async function updateException(req: Request, res: Response) {

    const {id} = req.params;
    const exception = await updateExceptionService(req.userId, Number(id), req.body); //calls the service layer for dbcall
    sendSuccess(res, exception, 200,'Availability Exception updated successfully'); 
  //  res.json();
}

export async function removeException(req: Request, res: Response) {

    const {id} = req.params;
    const exception = await removeExceptionService(req.userId, Number(id));
    sendSuccess(res, exception, 200,'Availability Exception removed successfully');
}   
