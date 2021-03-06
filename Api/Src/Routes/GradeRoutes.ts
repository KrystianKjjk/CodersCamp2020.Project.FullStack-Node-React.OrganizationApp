import * as express from "express";

import GradeController from "../Controllers/GradeController";

export default (controller: GradeController) => (router: express.Router) => {
    router.route("/grades").get(controller.getAllGrades);
    router.route("/grades/:id").get(controller.getGrade);
    router.route("/grades").post(controller.createGrade);
    router.route("/grades/:id").patch();
    router.route("/grades/:id").delete(controller.deleteGrade);
    return router;
};
