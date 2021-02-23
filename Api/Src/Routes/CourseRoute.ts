import * as express from 'express';
import CourseController from '../Controllers/CourseController';

const courseRoute = (controller: CourseController) => {
    return (router: express.Router) => {
        router.route("/courses").get(controller.getHelloWorld);
        // router.route("/helloWorld/:world").get(controller.getHelloWorldParam);
        // router.route("/helloWorld/:world").post(controller.postHelloWorldParam);
        return router;
    }
};
export default courseRoute;