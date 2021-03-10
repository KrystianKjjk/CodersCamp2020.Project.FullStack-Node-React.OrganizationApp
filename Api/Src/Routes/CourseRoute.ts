import * as express from 'express';
import CourseController from '../Controllers/CourseController';
import idValidation from '../Middlewares/IdValidation'

const courseRoute = (controller: CourseController) => {
    return (router: express.Router) => {
        router.route("/courses").get(controller.getCourses);
        router.route("/courses/:id").get(idValidation, controller.getCourseById);
        router.route("/courses").post(controller.createCourse);
        router.route("/courses/:id").put(idValidation, controller.updateCourse);
        router.route("/courses/:id").delete(idValidation, controller.deleteCourse);
        return router;
    }
};
export default courseRoute;