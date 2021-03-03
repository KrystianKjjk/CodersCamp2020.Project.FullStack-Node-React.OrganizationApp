import * as express from 'express';
import SectionController from '../Controllers/SectionController';

const sectionRoutes = (controller: SectionController) => {
    return (router: express.Router) => {
        router.route("/sections").get(controller.getSections);
        router.route("/sections/:id").get(controller.getSectionById);
        router.route("/sections").post(controller.createSection);
        router.route("/sections/:id").put(controller.updateSection);
        router.route("/sections/:id").delete(controller.deleteSection);
        return router;
    }
};
export default sectionRoutes;