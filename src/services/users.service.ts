import {getAll, getById} from "../repositories/user.repository.js";
import { notFound    } from "../utils/api-error.js";   
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