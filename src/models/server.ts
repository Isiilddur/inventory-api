'use strict'
import express from 'express';
import routes from '../routes/routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as cron from 'node-cron';
import twilioService from '../services/twilio.service';
export default class Server {

    PORT: any;
    app: any;
    constructor() {
        this.app = express();
        this.PORT = 3030;
        //this.app.use(express.urlencoded({ limit: "50mb", parameterLimit: 500000000 }));
        //this.app.use(express.json({ limit: "50mb", parameterLimit: 500000000 }));
        this.middlewares();
        this.routesConfig();
        //this.task.start()
        
    }

    middlewares(){
        // CORS
        this.app.use(cors())
        // Read and Parse of body
        this.app.use(express.json())
    }

    routesConfig(){
        this.app.use('/api/v1', routes)
    }

    startListen(){
        this.app.listen(this.PORT, () => {
            console.log(`Aplicación corriendo en puerto ${this.PORT}`)
        })
    }

     task = cron.schedule("00 11 * * *", ()=> {
         console.log("Executing...")
         twilioService.getMessageToSend()

    })
//     task = cron.schedule("*/1 * * * *", ()=> {
//         console.log("Executing...")
//         twilioService.getMessageToSend()

//    })
    
}
