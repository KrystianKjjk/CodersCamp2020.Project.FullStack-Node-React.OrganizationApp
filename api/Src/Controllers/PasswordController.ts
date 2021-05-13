import PasswordService from '../Services/PasswordService'
import { Request, Response } from 'express'
import * as mongoose from 'mongoose'

interface MailingService {
  sendMail: Function
}

export default class PasswordController {
  mailingService: MailingService
  passwordService: PasswordService

  constructor(mailingService, passwordService) {
    this.mailingService = mailingService
    this.passwordService = passwordService
  }

  requestPasswordReset = async (req: Request, res: Response) => {
    const userEmail = req.body.email
    try {
      const passwordRequestOutput = await this.passwordService.requestPasswordReset(
        userEmail,
      )
      this.mailingService.sendMail({
        from: 'coderscamp@fastmail.com',
        to: passwordRequestOutput.email,
        subject: 'CodersCamp password reset',
        template: 'requestResetPassword',
        context: {
          link: passwordRequestOutput.link,
        },
      })
      res
        .status(200)
        .json({
          message: `Password reset request sent to ${passwordRequestOutput.email}`,
        })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: `Password reset request not sent` })
    }
  }

  resetPassword = async (req: Request, res: Response) => {
    const userId = new mongoose.Types.ObjectId(req.body.userId)
    const token = req.body.token
    const password = req.body.password
    try {
      await this.passwordService.resetPassword(userId, token, password)
      res.status(200).json({ message: 'Password changed' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: `Password not changed` })
    }
  }

  changePassword = async (req: Request, res: Response) => {
    const userId = new mongoose.Types.ObjectId(req.body.id)
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    try {
      const passwordReset = await this.passwordService.changePassword(
        userId,
        oldPassword,
        newPassword,
      )
      res.status(200).json({ message: 'Password changed' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: `Password not changed` })
    }
  }
}
