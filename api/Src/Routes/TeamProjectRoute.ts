import * as express from 'express'
import TeamProjectController from '../Controllers/TeamProjectController'
import { HasId, HasRole } from '../Middlewares/HasRole'
import idValidation, { idsValidation } from '../Middlewares/IdValidation'

import { UserType } from '../Models/User'

const courseRoute = (controller: TeamProjectController) => {
  return (router: express.Router) => {
    router
      .route('/teams/projects/')
      .get(HasRole([UserType.Admin]), controller.getTeamProjects)
    router
      .route('/teams/projects/:id')
      .get(
        HasRole([UserType.Admin]),
        idValidation,
        controller.getTeamProjectById,
      )
    router
      .route('/teams/projects')
      .post(HasRole([UserType.Admin]), controller.createTeamProject)
    router
      .route('/teams/projects/:id')
      .put(
        HasRole([UserType.Admin]),
        idValidation,
        controller.updateTeamProject,
      )
    router
      .route('/teams/projects/:id')
      .delete(
        HasRole([UserType.Admin]),
        idValidation,
        controller.deleteTeamProject,
      )
    router
      .route('/teams/:id/projects')
      .get(
        HasRole([UserType.Admin]),
        idValidation,
        controller.getTeamProjectsByTeamId,
      )

    router
      .route('/mentors/me/:mentorId/projects')
      .get(
        HasId('mentorId'),
        idsValidation(),
        controller.getTeamProjectsByMentorId,
      )
    router
      .route('/mentors/me/:id/projects')
      .post(HasId('id'), idValidation, controller.createTeamProjectForMentor)
    router
      .route('/mentors/me/:mentorId/projects/:id')
      .put(
        HasId('mentorId'),
        idsValidation(),
        controller.updateTeamProjectForMentor,
      )
    router
      .route('/mentors/me/:mentorId/projects/:id')
      .delete(
        HasId('mentorId'),
        idsValidation(),
        controller.deleteTeamProjectForMentor,
      )

    return router
  }
}
export default courseRoute
