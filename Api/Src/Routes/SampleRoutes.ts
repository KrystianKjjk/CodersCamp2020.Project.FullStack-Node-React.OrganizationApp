import * as express from "express";
import SampleController from "../Controllers/SampleController";

const sampleRoutes = (router: express.Router, controller: SampleController) => {
    router.route("/helloWorld").get(controller.getHelloWorld);
    router.route("/helloWorld/:world").get(controller.getHelloWorldParam);
    router.route("/helloWorld/:world").post(controller.postHelloWorldParam);
};
export default sampleRoutes;
