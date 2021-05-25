import * as express from 'express'
import * as cache from 'memory-cache'
import AuthService from '../Services/AuthService'
import User from '../Models/User'

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
      const refreshToken = this.service.generateRefreshToken(user)

      return res
        .cookie('token', token, { maxAge: this.service.getTokenExp() * 1000 })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: this.service.getRefreshTokenExp() * 1000,
        })
        .status(200)
        .json({ _id: user._id, type: user.type })
    } catch {
      return res.status(500).json({ message: 'Internal server error.' })
    }
  }

  refreshToken = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const result = this.service.isRefreshTokenValid(req)

    const isTokenBlackListed = cache.get(req.cookies.refreshToken)

    if (isTokenBlackListed)
      return res.status(400).json({ message: 'TOKEN HAS BEEN BLACKLISTED' })

    if (result) {
      const user = await this.service.findUserById(result._id)
      user._id = result._id

      const token = this.service.generateToken(user)
      const refreshToken = this.service.generateRefreshToken(user)

      return res
        .cookie('token', token, { maxAge: this.service.getTokenExp() * 1000 })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: this.service.getRefreshTokenExp() * 1000,
        })
        .status(200)
        .json({ _id: user._id, type: user.type })
    } else {
      return res.status(400).json({ message: 'REFRESH TOKEN IS INVALID' })
    }
  }

  logOut = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const result = this.service.isRefreshTokenValid(req)

    //blacklist refresh token in cache for token lifetime in ms
    if (result) {
      cache.put(
        req.cookies.refreshToken,
        true,
        this.service.getRefreshTokenExp() * 1000,
      )
    }

    return res
      .cookie('token', 'DELETED', { maxAge: 0 })
      .cookie('refreshToken', 'DELETED', { httpOnly: true, maxAge: 0 })
      .status(200)
      .json({ message: 'LOGOUT' })
  }
}
