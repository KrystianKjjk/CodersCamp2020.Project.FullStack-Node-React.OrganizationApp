import * as express from 'express';
import SectionController from '../Controllers/SectionController';
import TestController from '../Controllers/TestController';

const sectionRoutes = (sectionController: SectionController, testController: TestController) => {
    return (router: express.Router) => {
        router.route("/sections").get(sectionController.getSections);
        router.route("/sections/:id").get(sectionController.getSectionById);
        router.route("/sections").post(sectionController.createSection);
        router.route("/sections/:id").put(sectionController.updateSection);
        router.route("/sections/:id").delete(sectionController.deleteSection);
        
        router.route("/sections/:id/test").post(testController.addTest);
        router.route("/sections/:sectionId/test/:testId").patch(testController.updateTest);
        router.route("/sections/:sectionId/test/:testId").delete(testController.deleteTest);
        return router;
    }
};
export default sectionRoutes;