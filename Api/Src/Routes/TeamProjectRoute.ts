import * as express from 'express';
import TeamProjectController from '../Controllers/TeamProjectController';

const courseRoute = (controller: TeamProjectController) => {
    return (router: express.Router) => {
        router.route("/teams/projects").get(controller.getTeamProjects);
        router.route("/teams/projects/:id").get(controller.getTeamProjectById);
        router.route("/teams/projects").post(controller.createTeamProject);
        router.route("/teams/projects/:id").put(controller.updateTeamProject);
        router.route("/teams/projects/:id").delete(controller.deleteTeamProject);
        return router;
    }
};
export default courseRoute;