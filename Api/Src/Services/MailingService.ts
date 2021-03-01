import * as hbs from 'nodemailer-express-handlebars'
import * as path from 'path';

interface Message {
    from: string,
    to: string,
    subject: string,
    text: string,
};

interface Nodemailer {
    createTransport({service, auth:{user, pass}})
}

const handlebarsOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: "./Api/Utils/",
    layoutsDir: "./Api/Utils/"
  },
  viewPath: path.resolve("./Api/Utils/"),
  extName: ".hbs"
};

export default class MailingService {
    private transport;

    constructor(mailer: Nodemailer){
            this.transport = mailer.createTransport({
                service: process.env.MAIL_SERVICE,
                auth: {
                  user: process.env.MAIL_USERNAME,
                  pass: process.env.MAIL_PW
                }
              });

            this.transport.use("compile", hbs(handlebarsOptions));
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