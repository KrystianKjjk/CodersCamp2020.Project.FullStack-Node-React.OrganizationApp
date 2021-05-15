import * as express from 'express'
import ProjectController from '../Controllers/ProjectController'
import { HasRole } from '../Middlewares/HasRole'
import idValidation from '../Middlewares/IdValidation'
import { UserType } from '../Models/User'

const projectRoutes = (controller: ProjectController) => {
  return (router: express.Router) => {
    router
      .route('/projects')
      .get(
        HasRole([UserType.Admin, UserType.Mentor, UserType.Participant]),
        controller.getAllProjects,
      )
    router
      .route('/projects/:id')
      .get(
        HasRole([UserType.Admin, UserType.Mentor, UserType.Participant]),
        idValidation,
        controller.getProject,
      )
    router
      .route('/projects')
      .post(HasRole([UserType.Admin]), controller.createProject)
    router
      .route('/projects/:id')
      .patch(HasRole([UserType.Admin]), idValidation, controller.updateProject)
    router
      .route('/projects/:id')
      .delete(HasRole([UserType.Admin]), idValidation, controller.deleteProject)
    return router
  }
}
export default projectRoutes
