import * as express from "express";
import ProjectController from "../Controllers/ProjectController";

const projectRoutes = (controller: ProjectController) => {
    return (router: express.Router) => {
        router.route("/projects").get(controller.getAllProjects);
        router.route("/projects/:id").get(controller.getProject);
        router.route("/projects").get(controller.createProject);
        router.route("/projects/:id").get(controller.updateProject);
        router.route("/projects/:id").get(controller.deleteProject);
        return router;
    }

};
export default projectRoutes;