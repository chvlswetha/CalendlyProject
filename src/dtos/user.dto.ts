import {z} from "zod";

export const createUserSchema = z.object({

    email:z.email('Invalid email address'), //zod has built in email validation
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'), //min length of 1 means it should not be empty
    slug: z.string().min(1).max(100).optional()
  
});


export const updateUserSchema = z.object({

    email:z.email('Invalid email address').optional(), //zod has built in email validation
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional(), //min length of 1 means it should not be empty        
}).refine((data) => data.email !== undefined || data.name !== undefined, {
    message: 'At least one field (email or name) must be provided for update',  
});

export type CreateUserDto = z.infer<typeof createUserSchema>; //takes Zod schema object and infers the type from it.
export type UpdateUserDto = z.infer<typeof updateUserSchema>;