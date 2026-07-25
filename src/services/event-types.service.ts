import slug from "slug";
import { CreateEventTypeDto, updateEventTypeDto } from "../dtos/eventType.dto.js";
import { findActiveByHostIdAndEventSlug,findbyHostId, SlugExistsForHost, getById, create, remove, update, findByHostAndSlug} from "../repositories/event-type.repository.js";
import { conflict,notFound,forbidden } from "../utils/api-error.js";
import{ getById as getUserById} from "../repositories/user.repository.js";

export async function listEventTypes(hostId: number) {

    const eventTypes = await findbyHostId(hostId);
    return eventTypes;
}

export async function createEventType(hostId: number, data : CreateEventTypeDto){
    const slugpassed = data.slug ?? slug(data.title, {lower: true});

    if(!slugpassed){
        throw conflict('Couldnot generate a slug for the event type');
    }

    const isSlugTaken = await SlugExistsForHost(hostId, slugpassed);

    if(isSlugTaken){
        throw conflict('An Event type with this slug already exists, pleae use a different slug')
    }
    return create(hostId, {...data, slug:slugpassed});
}

export async function updateEventType(hostId: number,id: number, data: updateEventTypeDto){
    const eventType = await getById(id);
    if (!eventType) {
        throw notFound('Event type not found');
    }

    if(eventType.hostId !== hostId){
         throw forbidden('You are not authorised to update this event type');
    }
    
    if( data.slug && data.slug !== eventType.slug){
        const isSlugTaken = await SlugExistsForHost(hostId,data.slug);

        if(isSlugTaken){
            throw conflict('A Event type with this slug already exists, please use a different slug');
        }
    }
    return update(id, data);
}

export async function removeEventType(hostId: number,id: number)
{
    const eventType = await getById(id);
    if (!eventType) {
        throw notFound('Event type not found');
    }

    if(eventType.hostId !== hostId){
         throw forbidden('You are not authorised to delete this event type');
    }

    return remove(id);
}

export async function getEventTypeId(id :number, hostId :number){
    
     const eventType = await getById(id);
     if (!eventType) {
        throw notFound('Event type not found');
    }

    if(eventType.hostId !== hostId){
         throw forbidden('You are not authorised to get this event type');
    }

    return eventType;
}

export async function getEventTypePublic(hostId: number, eventSlug: string)
{
    const eventType = await findActiveByHostIdAndEventSlug(hostId, eventSlug);
    if (!eventType) {
        throw notFound('Event type not found');
    }    
     const host = await getUserById(hostId);
      if(!host){
            throw notFound('Host not Found');        
         }
   
    return{
        eventType: {
            id: eventType.id,
            title: eventType.title,
            description: eventType.description,
            durationMinutes: eventType.durationMinutes,
            locationType: eventType.locationType
        },
        host: {
            name: host.name,
            email : host.email,
        }
    }
}

