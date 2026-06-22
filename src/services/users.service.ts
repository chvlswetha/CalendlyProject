import {getAll} from "../repositories/user.repository.js";

export async function findAllUsers(){ //called from Controller

    const users = await getAll(); //calls the reposiotry for dbcall
    return users; //gives the response back to controller

}