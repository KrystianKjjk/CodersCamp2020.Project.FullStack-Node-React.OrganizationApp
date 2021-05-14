import UserController from '../Controllers/UserController'
import * as express from 'express'
import idValidation from '../Middlewares/IdValidation'
import { HasId, HasRole } from '../Middlewares/HasRole'
import { UserType } from '../Models/User'

export default function UserRoutes(c: UserController) {
  return (router: express.Router) => {
    router.get('/users/:id', HasRole([UserType.Admin]), idValidation, c.getUser)
    router.get('/users/me/:id', HasId('id'), idValidation, c.getUserInfoById)
    router.get('/users', HasRole([UserType.Admin]), c.getAllUsers)
    router.get('/filter/users', HasRole([UserType.Admin]), c.getByTypeAndStatus)
    router.post('/users/register', HasRole([UserType.Admin]), c.register)
    router.patch(
      '/users/:id',
      HasRole([UserType.Admin]),
      idValidation,
      c.updateUser,
    )
    router.delete(
      '/users/:id',
      HasRole([UserType.Admin]),
      idValidation,
      c.deleteUser,
    )

    router.get('/courses/:courseId/users', c.getUsersByCourseId)
    return router
  }
}
