import { Request, Response} from "express";
import { findAllUsers as findAllUsersService} from "../services/users.service.js";

export async function findAllUsers(_req : Request, res: Response) {  //Called from Router
    const response = await findAllUsersService();  //controller will call service
    res.json(response);
}