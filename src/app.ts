//configure the settings for express app object

import express , {Express} from 'express';


const app : Express = express();

app.get('/health', (_req, res) => {

    res.json({ 
        status: 'ok!',
        timeStamp: new Date().toISOString()
    })
    });


    export { app };