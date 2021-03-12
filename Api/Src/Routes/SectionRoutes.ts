import * as express from 'express';
import SectionController from '../Controllers/SectionController';
import { HasRole } from '../Middlewares/HasRole';
import { UserType } from '../Models/User';

const sectionRoutes = (controller: SectionController) => {
    return (router: express.Router) => {
        router.route("/sections").get(HasRole([UserType.Admin, UserType.Mentor, UserType.Participant]), controller.getSections);
        router.route("/sections/:id").get(HasRole([UserType.Admin, UserType.Mentor, UserType.Participant]), controller.getSectionById);
        router.route("/sections").post(HasRole([UserType.Admin]), controller.createSection);
        router.route("/sections/:id").put(HasRole([UserType.Admin]), controller.updateSection);
        router.route("/sections/:id").delete(HasRole([UserType.Admin]), controller.deleteSection);
        return router;
    }
};
export default sectionRoutes;