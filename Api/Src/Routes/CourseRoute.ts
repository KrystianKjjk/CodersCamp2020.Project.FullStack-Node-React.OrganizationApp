import * as express from 'express';
import CourseController from '../Controllers/CourseController';

const courseRoute = (controller: CourseController) => {
    return (router: express.Router) => {
        router.route("/courses").get(controller.getCourses);
        router.route("/courses/:id").get(controller.getCourseById);
        router.route("/courses").post(controller.createCourse);
        router.route("/courses/:id").put(controller.updateCourse);
        router.route("/courses/:id").delete(controller.deleteCourse);
        return router;
    }
};
export default courseRoute;