import * as express from "express";

import GradeController from "../Controllers/GradeController";
import {UserType} from "../Models/User";
import {HasRole} from "../Middlewares/HasRole";
import AuthGradeController from "../Controllers/GradeAuthController";

export default (controller: GradeController, authController: AuthGradeController) => (router: express.Router) => {

    router.use( HasRole([UserType.Participant, UserType.Mentor, UserType.Admin]) );

    router.get('/grades', HasRole([UserType.Admin]), controller.getAllGrades);

    router.route("/grades/:id").get(controller.getGrade);
    router.route("/grades").post(controller.createGrade);
    router.route("/grades/:id").patch(controller.updateGrade);
    router.route("/grades/:id").delete(controller.deleteGrade);
    return router;
};
