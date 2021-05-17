import * as express from 'express'
import AuthController from '../Controllers/AuthController'
import validate from '../Middlewares/Validate'
import { validateUserLogin, validateUserRegistration } from '../Models/User'

export default (controller: AuthController) => (router: express.Router) => {
  router
    .route('/register')
    .all(validate(validateUserRegistration))
    .post(controller.register)
  router.route('/login').all(validate(validateUserLogin)).post(controller.login)
  router.route('/refresh-token').get(controller.refreshToken)
  router.route('/logout').get(controller.logOut)

  return router
}
