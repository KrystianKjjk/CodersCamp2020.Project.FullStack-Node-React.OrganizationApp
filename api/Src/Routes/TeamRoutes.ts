import * as express from 'express'
import TeamController from '../Controllers/TeamController'
import { HasRole } from '../Middlewares/HasRole'
import { UserType } from '../Models/User'

const teamsRoutes = (controller: TeamController) => {
  return (router: express.Router) => {
    router
      .route('/teams')
      .get(HasRole([UserType.Admin]), controller.getTeamsList)
    router
      .route('/teams/:id')
      .get(HasRole([UserType.Admin]), controller.getTeamByID)

    router
      .route('/teams')
      .post(HasRole([UserType.Admin]), controller.createTeam)
    router
      .route('/teams/:id')
      .delete(HasRole([UserType.Admin]), controller.deleteTeam)
    router
      .route('/teams/:id')
      .patch(HasRole([UserType.Admin]), controller.updateTeam)

    router
      .route('/teams/:id/users')
      .post(HasRole([UserType.Admin]), controller.addUserToTeam)
    router
      .route('/teams/:teamId/users/:userId')
      .delete(HasRole([UserType.Admin]), controller.deleteUserFromTeam)

    router
      .route('/teams/:id/mentor')
      .post(HasRole([UserType.Admin]), controller.addMentorToTeam)
    router
      .route('/teams/:id/mentor/')
      .delete(HasRole([UserType.Admin]), controller.deleteMentorFromTeam)

    router
      .route('/courses/:id/teams')
      .get(HasRole([UserType.Admin]), controller.getTeamsByCourseId)
    return router
  }
}
export default teamsRoutes
