import * as express from 'express';
import TeamProjectController from '../Controllers/TeamProjectController';
import { HasRole } from '../Middlewares/HasRole';
import idValidation from '../Middlewares/IdValidation';
import { UserType } from '../Models/User';

const courseRoute = (controller: TeamProjectController) => {
    return (router: express.Router) => {
        router.route("/teams/projects").get(HasRole([UserType.Admin]), controller.getTeamProjects);
        router.route("/teams/projects/:id").get(HasRole([UserType.Admin, UserType.Mentor, UserType.Participant]), idValidation, controller.getTeamProjectById);
        router.route("/teams/projects").post(HasRole([UserType.Admin, UserType.Mentor]), controller.createTeamProject);
        router.route("/teams/projects/:id").put(HasRole([UserType.Admin, UserType.Mentor]), idValidation, controller.updateTeamProject);
        router.route("/teams/projects/:id").delete(HasRole([UserType.Admin, UserType.Mentor]), idValidation, controller.deleteTeamProject);
        router.route("/teams/:id/projects").get(HasRole([UserType.Admin, UserType.Mentor, UserType.Participant]), idValidation, controller.getTeamProjectsByTeamId);
        return router;
    }
};
export default courseRoute;