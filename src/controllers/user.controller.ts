import { Request, Response} from "express";
import { findAllUsers as findAllUsersService, 
    findById as findByIdService,
    createUser as createUserService,
    updateUser as updateUserService,
    deleteUser as deleteUserService
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

export async function updateUser(req: Request, res: Response) {

    const {id} = req.params;
    const updatedUser = await updateUserService(Number(id), req.body);
    sendSuccess(res,updatedUser,200,'User updated successfully ');
}   

export async function deleteUser(req: Request, res: Response) {

    const {id} = req.params;
    const deletedUser = await deleteUserService(Number(id));
    sendSuccess(res,deletedUser,200,'User deleted successfully ');
}