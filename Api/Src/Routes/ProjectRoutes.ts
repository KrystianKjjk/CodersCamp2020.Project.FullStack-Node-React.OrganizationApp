import * as express from "express";
import ProjectController from "../Controllers/ProjectController";

const projectRoutes = (controller: ProjectController) => {
    return (router: express.Router) => {
        router.route("/projects").get(controller.XXXXXXXXX);
        router.route("/projects/:id").get(controller.XXXXXXX);
        return router;
    }

};
export default projectRoutes;