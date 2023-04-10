'use strict'
import express from 'express';
import routes from '../routes/routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as cron from 'node-cron';
import twilioService from '../services/twilio.service';
import fs from 'fs';
import https from 'https';

export default class Server {

    
    PORT: any;
    app: any;
    key: any;
    cert: any;
    cred: any;
    constructor() {
        this.app = express();
        this.PORT = 3030;
        //this.app.use(express.urlencoded({ limit: "50mb", parameterLimit: 500000000 }));
        //this.app.use(express.json({ limit: "50mb", parameterLimit: 500000000 }));
        this.middlewares();
        this.routesConfig();
        this.key = fs.readFileSync('../../private.key');
        this.cert = fs.readFileSync('../../certificate.crt')
        this.cred = {key: this.key , cert: this.cert};
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
        this.app.get('/.well-known/pki-validation/E25B859D1C44A8E65C597069B74A1073.txt', (req:any,res:any)=>{
            res.sendFile('/home/ubuntu/inventory-api/E25B859D1C44A8E65C597069B74A1073.txt')
        })
    }

    startListen(){
        this.app.listen(this.PORT, () => {
            console.log(`Aplicación corriendo en puerto ${this.PORT}`)
        })

        const httpsServer = https.createServer(this.cred, this.app)
        httpsServer.listen(5443);
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
