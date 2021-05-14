import * as express from 'express'
import CourseController from '../Controllers/CourseController'
import idValidation from '../Middlewares/IdValidation'
import { HasRole } from '../Middlewares/HasRole'
import { UserType } from '../Models/User'

const courseRoute = (controller: CourseController) => {
  return (router: express.Router) => {
    router.route('/courses').get(controller.getCourses)
    router
      .route('/courses/:id')
      .get(HasRole([UserType.Admin]), idValidation, controller.getCourseById)
    router
      .route('/courses')
      .post(HasRole([UserType.Admin]), controller.createCourse)
    router
      .route('/courses/:id')
      .put(HasRole([UserType.Admin]), idValidation, controller.updateCourse)
    router
      .route('/courses/:id')
      .delete(HasRole([UserType.Admin]), idValidation, controller.deleteCourse)
    return router
  }
}
export default courseRoute
