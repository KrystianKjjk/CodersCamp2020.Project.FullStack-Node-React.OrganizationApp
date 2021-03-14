import { validate } from '@babel/types';
import * as express from 'express';
import TeamProjectController from '../Controllers/TeamProjectController';
import { HasId, HasRole } from '../Middlewares/HasRole';
import idValidation from '../Middlewares/IdValidation';
import { UserType } from '../Models/User';

const courseRoute = (controller: TeamProjectController) => {
    return (router: express.Router) => {
        router.route("/teams/projects").get(HasRole([UserType.Admin]), controller.getTeamProjects);
        router.route("/teams/projects/:id").get(HasRole([UserType.Admin]), idValidation, controller.getTeamProjectById);
        router.route("/teams/projects").post(HasRole([UserType.Admin]), controller.createTeamProject);
        router.route("/teams/projects/:id").put(HasRole([UserType.Admin]), idValidation, controller.updateTeamProject);
        router.route("/teams/projects/:id").delete(HasRole([UserType.Admin]), idValidation, controller.deleteTeamProject);
        router.route("/teams/:id/projects").get(HasRole([UserType.Admin]), idValidation, controller.getTeamProjectsByTeamId);
        router.route("/mentors/:id/projects").get(HasId('id'), idValidation, controller.getTeamProjectsByMentorId);
        return router;
    }
};
export default courseRoute;