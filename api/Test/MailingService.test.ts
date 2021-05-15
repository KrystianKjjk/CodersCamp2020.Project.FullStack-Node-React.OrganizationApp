import MailingService from '../Src/Services/MailingService'
import * as dotenv from 'dotenv'
dotenv.config()

const mockNodemailer = {
  createTransport: jest.fn(),
}

const mockInitializerData = {
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PW,
  },
}

const mailingService = new MailingService(mockNodemailer)

// just one test here as the functionality is based on external package
// (which is probably tested better than I can do)

describe('Mailing service test', () => {
  test('Constructor initializes the mailing service with correct values', () => {
    expect(mockNodemailer.createTransport).toHaveBeenCalledTimes(1) //mock initializer function was called
    expect(mockNodemailer.createTransport).toHaveBeenCalledWith(
      mockInitializerData,
    )
  })
})
