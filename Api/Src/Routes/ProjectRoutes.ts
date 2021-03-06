import * as express from "express";
import ProjectController from "../Controllers/ProjectController";
import idValidation from '../Middlewares/IdValidation'

const projectRoutes = (controller: ProjectController) => {
    return (router: express.Router) => {
        router.route("/projects").get(controller.getAllProjects);
        router.route("/projects/:id").get(idValidation, controller.getProject);
        router.route("/projects").post(controller.createProject);
        router.route("/projects/:id").patch(idValidation, controller.updateProject);
        router.route("/projects/:id").delete(idValidation, controller.deleteProject);
        return router;
    }

};
export default projectRoutes;