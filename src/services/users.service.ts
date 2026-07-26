import {getAll, getById, findByEmail, remove} from "../repositories/user.repository.js";
import { notFound ,conflict   } from "../utils/api-error.js"; 
import { CreateUserDto,UpdateUserDto } from "../dtos/user.dto.js";
import { create,update } from "../repositories/user.repository.js";
import slug from "slug";

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

    const slugpassed = data.slug ? data.slug : slug(data.name, {lower : true });

    return create({...data, slug: slugpassed}); //calls the reposiotry layer for dbcall and gives the response back to controller
}

export async function updateUser(id: number, data: UpdateUserDto){ 
    //check if user with id exists

    const user = await getById(id); 
    if(!user){
        throw notFound('User not found');
    }

    if(data.email && data.email !== user.email){ //if email is being updated then check if the new email already exists or not
        const existinguser = await findByEmail(data.email);
        if(existinguser){
            throw conflict('User already exists with this email');
        }
    }

    return update(id, data); //calls the reposiotry layer for dbcall and gives the response back to controller
}

export async function deleteUser(id: number){
    //check if user with id exists
    const user = await getById(id);
    if(!user){
        throw notFound('User not found');
    }
    return remove(id); //calls the repository layer for dbcall and gives the response back to controller
}