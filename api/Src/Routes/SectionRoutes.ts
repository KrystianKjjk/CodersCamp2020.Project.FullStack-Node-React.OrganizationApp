import * as express from 'express'
import SectionController from '../Controllers/SectionController'
import TestController from '../Controllers/TestController'
import { HasRole } from '../Middlewares/HasRole'
import { UserType } from '../Models/User'

const sectionRoutes = (
  sectionController: SectionController,
  testController: TestController,
) => {
  return (router: express.Router) => {
    router
      .route('/sections')
      .get(HasRole([UserType.Admin]), sectionController.getSections)
    router.route('/sections/:id').get(sectionController.getSectionById)
    router
      .route('/sections')
      .post(HasRole([UserType.Admin]), sectionController.createSection)
    router
      .route('/sections/:id')
      .put(HasRole([UserType.Admin]), sectionController.updateSection)
    router
      .route('/sections/:id')
      .delete(HasRole([UserType.Admin]), sectionController.deleteSection)
    router
      .route('/courses/:id/sections')
      .get(sectionController.getSectionsByCourseId)

    router
      .route('/sections/:id/test')
      .post(HasRole([UserType.Admin]), testController.addTest)
    router
      .route('/sections/:sectionId/test/:testId')
      .patch(HasRole([UserType.Admin]), testController.updateTest)
    router
      .route('/sections/:sectionId/test/:testId')
      .delete(HasRole([UserType.Admin]), testController.deleteTest)
    return router
  }
}
export default sectionRoutes
