import * as express from "express";
import SampleController from "../Controllers/SampleController";

const sampleRoutes = (controller: SampleController) => {
    return (router: express.Router) => {
        router.route("/helloWorld").get(controller.getHelloWorld);
        router.route("/helloWorld/:world").get(controller.getHelloWorldParam);
        router.route("/helloWorld/:world").post(controller.postHelloWorldParam);
        return router;
    }
};
export default sampleRoutes;
