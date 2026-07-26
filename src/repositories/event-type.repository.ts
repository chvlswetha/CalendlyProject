import { notDeepEqual } from 'node:assert';
import {prisma} from '../config/database.js';
import { CreateEventTypeDto, updateEventTypeDto } from '../dtos/eventType.dto.js';
import { notFound } from '../utils/api-error.js';

export async function findbyHostId(hostId: number) {

    const eventTypes = await prisma.eventType.findMany({
        where : {
        hostId
    },
    orderBy:
    {
        createdAt : 'desc'
    }
});

return eventTypes;

}

export async function getById(id: number){

    const eventType = await prisma.eventType.findUnique({
        where :{
            id
        }
    });
    return eventType;
}

export async function create(hostId: number, data : CreateEventTypeDto & {slug : String}){
    
    const eventType = await prisma.eventType.create({
        data: {
          hostId,
         ...data   
       }
    });
    return eventType;
    
}

export async function update(id: number , data: updateEventTypeDto){
    const eventType = await prisma.eventType.update({
        where: { id },
        data : data
    });
    return eventType;
}
    
export async function remove(id: number){
    await prisma.eventType.delete({
        where: { id } 
    });    
    
}  

export async function findByHostAndSlug(hostId: number, slug: string){
    const eventType = await prisma.eventType.findFirst({
        where: {
            hostId,
            slug
        }
    });

    return eventType;
}

export async function findActiveByHostIdAndEventSlug(hostId: number, slug: string){

    
     const eventType = await prisma.eventType.findFirst({
        where: {
            isActive: true,
            slug,
            hostId : hostId

        }
     });
     return eventType;
}


//checking if slug exists for a given host
export async function SlugExistsForHost(hostId: number, slug: string){

    const existing = await prisma.eventType.findFirst({
        where: {
            hostId,
            slug
        }
    });

    return existing != null;
}

export async function findActiveEventTypesByHost(hostId: number){

    
     const eventTypes = await prisma.eventType.findMany({
        where: {
            isActive: true,
            hostId : hostId

        }
     });
     return eventTypes;
}
