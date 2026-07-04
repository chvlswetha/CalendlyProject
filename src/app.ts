//configure the settings for express app object

//import express , {Express,NextFunction} from 'express'; //cmmented the msample middleware code
import express , {Express} from 'express';
import { userRouter } from './routers/user.router.js';
import { errorHandler } from './middleware/error-handler.js';   
import { ApiError } from './utils/api-error.js';
import { routeNotFound } from './middleware/route-not-found.js';


const app : Express = express();

app.use(express.json()); //this will help express to deserialize  req body(json) into to javascript object
app.use(express.text()); //this will help express to deserialize  req body(text) into to javascript object
app.use(express.urlencoded()); //this will help express to deserialize  req body(urlencoded) into to javascript object

/*function logRequest(req: Request, res: Response, next: NextFunction) {  //middleware function
    console.log("URL:" , req.url);
    console.log("Execute log request middleware");

    next();
    console.log("logger middle ware completed ");
}

function anotherLogger(req: Request, res: Response, next: NextFunction) {  //middleware function
    console.log("URL:" , req.url);
    console.log("Execute another middleware" );

    next();
}

//we can group the middleware functions into array and pass them

const sequence = [logRequest, anotherLogger]; */

app.get('/health', (_req, res) => {

    console.log("Executed health check route");
    throw new ApiError(400, "Bad Request");
    res.json({ 
        status: 'ok!',
        timeStamp: new Date().toISOString()
    })
    });

    //call again with array function of middlewares
   /* app.get('/health', sequence, (_req, res) => {

    console.log("Executed health check route");
    res.json({ 
        status: 'ok!',
        timeStamp: new Date().toISOString()
    })
    }); */
    app.use('/api/users',userRouter); //if the route/request starts with /users, userRouter will  take that request. //UserRouter is delgate here

    
    //at the end we mention our error handler middleware.
    app.use(routeNotFound); //this will handle routes that are not found


    app.use(errorHandler);  
   
    export { app }; //send the response back to client that is in server.ts file.
    
