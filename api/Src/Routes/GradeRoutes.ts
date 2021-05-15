import * as express from 'express'

import GradeController from '../Controllers/GradeController'
import { UserType } from '../Models/User'
import { HasRole } from '../Middlewares/HasRole'
import AuthGradeController from '../Controllers/GradeAuthController'

export default (
  gradeController: GradeController,
  authController: AuthGradeController,
) => (router: express.Router) => {
  router
    .route('/grades/:userID')
    .get(
      HasRole([UserType.Mentor, UserType.Admin]),
      authController.getPostUserGrades,
      gradeController.getGrades,
    )
    .post(
      HasRole([UserType.Mentor, UserType.Admin]),
      authController.getPostUserGrades,
      gradeController.createGrade,
    )

  router
    .route('/grades/:id')
    .patch(
      HasRole([UserType.Mentor, UserType.Admin]),
      authController.patchDeleteUserGrades,
      gradeController.updateGrade,
    )
    .delete(
      HasRole([UserType.Mentor, UserType.Admin]),
      authController.patchDeleteUserGrades,
      gradeController.deleteGrade,
    )

  return router
}
