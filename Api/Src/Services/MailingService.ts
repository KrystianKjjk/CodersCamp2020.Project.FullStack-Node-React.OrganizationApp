import * as nodemailer from 'nodemailer';

interface Message {
    from: string,
    to: string,
    subject: string,
    text: string,
};

export default class MailingService {
    private transport;

    constructor(){
            this.transport = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                  user: process.env.MAIL_USERNAME,
                  pass: process.env.MAIL_PW
                }
              });
    }

    sendMail(message: Message){
        this.transport.sendMail(message, function(err, info){
            if (err) {
                console.log(err)
              } else {
                console.log(info);
              }
        })               
    }

}