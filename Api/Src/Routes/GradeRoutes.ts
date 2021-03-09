import * as express from "express";

import GradeController from "../Controllers/GradeController";
import {UserType} from "../Models/User";
import {HasRole} from "../Middlewares/HasRole";
import AuthGradeController from "../Controllers/GradeAuthController";

export default (gradeController: GradeController, authController: AuthGradeController) => (router: express.Router) => {

    router.use( HasRole([UserType.Participant, UserType.Mentor, UserType.Admin]) );

    router.get("/grades", HasRole([UserType.Admin]), gradeController.getAllGrades);


    router.get("/grades/:id", authController.authGetGradeById, gradeController.getGrade);

    router.route("/grades").post(gradeController.createGrade);
    router.route("/grades/:id").patch(gradeController.updateGrade);
    router.route("/grades/:id").delete(gradeController.deleteGrade);
    return router;
};
