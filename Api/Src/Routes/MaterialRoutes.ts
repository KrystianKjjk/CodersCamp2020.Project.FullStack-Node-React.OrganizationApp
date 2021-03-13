import * as express from "express";

import MaterialController from "../Controllers/MaterialController";
import { HasRole } from "../Middlewares/HasRole";

export default (controller: MaterialController) => (router: express.Router) => {
    router.route("/materials").get(controller.getAllMaterials);
    router.route("/materials/:id").get(controller.getMaterialById);
    router.route("/materials").post(controller.createMaterial);
    router.route("/materials/:id").patch(controller.updateMaterial);
    router.route("/materials/:id").delete(controller.deleteMaterial);
    /*    router.route("/materials/:sectionID").post(controller.createAndAssignMaterial);
*/
    return router;
};
