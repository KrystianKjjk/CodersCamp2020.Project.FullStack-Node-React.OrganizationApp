import * as express from 'express'
import AuthService from '../Services/AuthService'
import User from '../Models/User'
const bcrypt = require('bcrypt')

interface MailingService {
  sendMail: Function
}

export default class AuthController {
  mailingService: MailingService

  constructor(private service: AuthService, mailingService: MailingService) {
    this.mailingService = mailingService
  }

  register = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      let user = await this.service.findUser(req.body.email)
      if (user)
        return res
          .status(400)
          .json({ message: 'Email has already been taken.' })
      req.body.password = await this.service.hashPassword(req.body)
      user = new User(req.body)
      await user.validate()
      await this.service.saveUser(user)
      res.status(201).json({ message: 'Register succeed' })

      //Mailing the user
      this.mailingService.sendMail({
        from: 'coderscamp@fastmail.com',
        to: user.email,
        subject: 'Welcome to CodersCamp',
        template: 'welcomeEmail',
        context: {
          userName: user.name,
          email: user.email,
          appLink: process.env.PAGE_URL || 'https://coderscamp.edu.pl/',
        },
      })
    } catch (error) {
      if (error.name === 'ValidationError')
        return res.status(400).json({ message: error.message })
      return res.status(500).json({ message: 'Internal server error.' })
    }
  }

  login = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const user = await this.service.findUser(req.body.email)
      if (!user)
        return res.status(401).json({ message: 'Invalid email or password.' })
      const result = await this.service.checkPassword(req.body.password, user)
      if (!result)
        return res.status(401).json({ message: 'Invalid email or password.' })
      const token = this.service.generateToken(user)
      res
        .header('x-auth-token', token)
        .status(200)
        .json({ _id: user._id, type: user.type })
    } catch {
      return res.status(500).json({ message: 'Internal server error.' })
    }
  }
}
