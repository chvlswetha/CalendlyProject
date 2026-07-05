import { Request, Response} from "express";
import { findAllUsers as findAllUsersService, 
    findById as findByIdService,
    createUser as createUserService
} from "../services/users.service.js";
import { sendSuccess } from "../utils/api-response.js";

export async function findAllUsers(_req : Request, res: Response) {  //Called from Router
    const response = await findAllUsersService();  //controller will call service
    //res.json(response); //gives the response back to router that is in app object
    sendSuccess(res, response); //this function gives more structured response
}

export async function findById(_req: Request, res: Response) {  
    const {id} = _req.params; //API parameters comes as string
    console.log("Inside Controller");
    const response = await findByIdService(Number(id));  // convert the string id to number to the service

    //res.json(response); //gives the response back to router that is in app object
    sendSuccess(res, response); //gives the response back to router that is in app object
}

export async function createUser(req: Request, res: Response) {

    const newUser = await createUserService(req.body); //calls the service layer for dbcall
    sendSuccess(res,newUser,201,'User created successfully '); 
  //  res.json();
}