import { prisma } from  "../config/database.js"

export async function getAll(){
    const users = await prisma.user.findMany(); // this repository function  makes the database call    
    return users;  //gives the response back to service
}