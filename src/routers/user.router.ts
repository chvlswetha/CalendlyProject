import { Router } from "express";
import { findAllUsers } from "../controllers/user.controller.js";

//So the /users will delegate to userRouter from App.ts and come here
export const userRouter:Router = Router(); //we will see the router after /users in the url.

//is the request having anything after api/users?  No here . and it is a "get" then it will be handled by "findAllUsers" controller
userRouter.get('/', findAllUsers);  //navigates to controller
