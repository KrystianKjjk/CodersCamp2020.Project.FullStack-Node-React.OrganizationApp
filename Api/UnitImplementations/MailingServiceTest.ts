import MailingService from '../Src/Services/MailingService'
import * as dotenv from 'dotenv';
dotenv.config();

let mailTest = new MailingService;

const message = {
    from: 'filip.szwedo@gmail.com', // Sender address
    to: 'filip.szwedo@gmail.comm',         // add your email here :)
    subject: 'tescik', // Subject line
    text: 'mailik' // Plain text body
};


mailTest.sendMail(message);
console.log('mail should be sent, check it out :)');