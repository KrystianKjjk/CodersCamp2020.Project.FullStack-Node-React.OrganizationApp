import * as express from "express";

import MaterialController from "../Controllers/MaterialController";

export default (controller: MaterialController) => (router: express.Router) => {
    router.route("/materials").get(controller.getAllMaterials);
    router.route("/materials/:id").get(controller.getMaterialById);
    router.route("/materials/section/:id").post(controller.createAndAssignMaterial);
    router.route("/materials/:id").patch(controller.updateMaterial);
    router.route("/materials/:id").delete(controller.deleteMaterial);

    return router;
};
