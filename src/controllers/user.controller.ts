import { Request, Response} from "express";
import { findAllUsers as findAllUsersService, findById as findByIdService} from "../services/users.service.js";

export async function findAllUsers(_req : Request, res: Response) {  //Called from Router
    const response = await findAllUsersService();  //controller will call service
    res.json(response); //gives the response back to router that is in app object
}

export async function findById(_req: Request, res: Response) {  
    const {id} = _req.params; //API parameters comes as string
    const response = await findByIdService(Number(id));  // convert the string id to number to the service

    res.json(response); //gives the response back to router that is in app object
}