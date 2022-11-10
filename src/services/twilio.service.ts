import { Client } from "@twilio/conversations";
import { Twilio } from "twilio";
import orderService from "./order.service";
import paymentService from "./payment.service"
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const myNumber = process.env.MY_NUMBER;

const client = new Twilio("ACcc6b5e3e6bbbb36b8249f2457b9dfb72", "f576692fdc6d1df9895d3ebdc22bc727");

const sendMessage = (message: string) =>{
    client.messages 
      .create({ 
         body: message,  
         messagingServiceSid: 'MGe050dbfecd61a9b21a93ce3224a53188',      
         to: '+525525008170',
         from: '+18585443793'
       }) 
      .then(message => console.log(message.sid)).catch(err => console.log(err))
}

const getMessageToSend = async() => {
  await orderService.listOrdersWithMoreThanXDays()
  let res = await paymentService.getClientsWithDebths()
  console.log(res);
  
  sendMessage(res)
}
const algo = () => {}
export default{getMessageToSend, algo}