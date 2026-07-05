import {z} from "zod";

export const createUserSchema = z.object({

    email:z.email('Invalid email address'), //zod has built in email validation
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'), //min length of 1 means it should not be empty
  
});

export type CreateuserDto = z.infer<typeof createUserSchema>; //takes Zod schema object and infers the type from it.

