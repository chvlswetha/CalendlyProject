import { prisma } from  "../config/database.js"

export async function getAll(){
    const users = await prisma.user.findMany(); // this repository function  makes the database call    
    return users;  //gives the response back to service
}

export async function getById(id: number){
    console.log("Inside Repository");
    const user = await prisma.user.findUnique({
        where :{
            id : id
        }      
    });
    console.log("User:",user);
    return user;
}