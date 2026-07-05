import {getAll, getById, findByEmail} from "../repositories/user.repository.js";
import { notFound ,conflict   } from "../utils/api-error.js"; 
import { CreateUserDto } from "../dtos/user.dto.js";
import { create } from "../repositories/user.repository.js";

export async function findAllUsers(){ //called from Controller

    const users = await getAll(); //calls the reposiotry for dbcall
    return users; //gives the response back to controller

}
export async function findById(id: number){ 

    console.log("Inside Service");

    const user = await getById(id); //calls the reposiotry layer for dbcall

    if(!user){ //user not found for the given id
        throw notFound ('User not found');
    }
    
    return user; //gives the response back to controller
}

export async function createUser(data: CreateUserDto){ //called from Controller
    //check if user already exists or not

    const existinguser = await findByEmail(data.email); 
    if(existinguser){
        throw conflict('User already exists with this email');
    }
    return create(data); //calls the reposiotry layer for dbcall and gives the response back to controller
}