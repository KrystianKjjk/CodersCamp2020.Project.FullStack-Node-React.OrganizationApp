import PasswordController from '../Controllers/PasswordController'
import * as express from 'express'
import { HasRole } from '../Middlewares/HasRole'
import { UserType } from '../Models/User'

export default function PasswordRoutes(c: PasswordController) {
  return (router: express.Router) => {
    router.post('/users/requestpasswordreset', c.requestPasswordReset)
    router.post('/users/resetpassword', c.resetPassword)
    router.post(
      '/users/changepassword',
      HasRole([UserType.Admin, UserType.Mentor, UserType.Participant]),
      c.changePassword,
    )
    return router
  }
}

//based on https://blog.logrocket.com/implementing-a-secure-password-reset-in-node-js/
