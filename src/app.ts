//configure the settings for express app object

import express , {Express} from 'express';
import { userRouter } from './routers/user.router.js';


const app : Express = express();

app.get('/health', (_req, res) => {

    res.json({ 
        status: 'ok!',
        timeStamp: new Date().toISOString()
    })
    });
    app.use('/api/users',userRouter); //if the route/request starts with /users, userRouter will  take that request. //UserRouter is delgate here

    export { app }; //send the response back to client that is in server.ts file.