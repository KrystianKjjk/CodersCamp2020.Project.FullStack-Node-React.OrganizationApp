import * as express from "express";

import GradeController from "../Controllers/GradeController";
import {UserType} from "../Models/User";
import {HasRole} from "../Middlewares/HasRole";

export default (controller: GradeController) => (router: express.Router) => {
    router.route("/grades").all(HasRole([UserType.Admin])).get(controller.getAllGrades);
    router.route("/grades/:id").get(controller.getGrade);
    router.route("/grades").post(controller.createGrade);
    router.route("/grades/:id").patch(controller.updateGrade);
    router.route("/grades/:id").delete(controller.deleteGrade);
    return router;
};
