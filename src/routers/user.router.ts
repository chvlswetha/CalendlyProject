import { Router } from "express";
import { findAllUsers,findById } from "../controllers/user.controller.js";

//So the /users will delegate to userRouter from App.ts and come here
export const userRouter:Router = Router(); //we will see the router after /users in the url.

//is the request having anything after api/users?  No here . and it is a "get" then it will be handled by "findAllUsers" controller
userRouter.get('/', findAllUsers);  //navigates to controller

//In express ":" represnt varaible - :id is variable value
// :id represent /api/users/id where id is a parameter. If the request is having anything after /api/users/ and it is a "get" then it will be handled by "findById" controller
userRouter.get('/:id', findById);  //navigates to controller
