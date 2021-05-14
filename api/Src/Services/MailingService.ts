import * as hbs from 'nodemailer-express-handlebars'

interface Message {
  from: string
  to: string
  subject: string
  text: string
}

interface Nodemailer {
  createTransport({ service, auth: { user, pass } })
}

const handlebarsOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: './api/Utils/',
    layoutsDir: './api/Utils/',
  },
  viewPath: './api/Utils/',
  extName: '.hbs',
}

export default class MailingService {
  private transport

  constructor(mailer: Nodemailer) {
    this.transport = mailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PW,
      },
    })
  }

  sendMail(message: Message) {
    this.transport.use('compile', hbs(handlebarsOptions))
    this.transport.sendMail(message, function (err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
      }
    })
  }
}
