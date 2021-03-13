import * as express from 'express';
import TeamProjectController from '../Controllers/TeamProjectController';
import { HasRole } from '../Middlewares/HasRole';
import { UserType } from '../Models/User';

const courseRoute = (controller: TeamProjectController) => {
    return (router: express.Router) => {
        router.route("/teams/projects").get(HasRole([UserType.Admin]), controller.getTeamProjects);
        router.route("/teams/projects/:id").get(HasRole([UserType.Admin]), controller.getTeamProjectById);
        router.route("/teams/projects").post(HasRole([UserType.Admin]), controller.createTeamProject);
        router.route("/teams/projects/:id").put(HasRole([UserType.Admin]), controller.updateTeamProject);
        router.route("/teams/projects/:id").delete(HasRole([UserType.Admin]), controller.deleteTeamProject);
        return router;
    }
};
export default courseRoute;