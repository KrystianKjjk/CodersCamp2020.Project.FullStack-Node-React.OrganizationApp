import MailingService from '../Src/Services/MailingService'
import * as dotenv from 'dotenv'
import * as nodemailer from 'nodemailer'
dotenv.config()

let mailTest = new MailingService(nodemailer)

const message = {
  from: 'test@test.com', // Sender address
  to: 'your@mail.com', // add your email here :)
  subject: 'tescik', // Subject line
  text: 'mailik', // Plain text body
}

mailTest.sendMail(message)
console.log('mail should be sent, check it out :)')
