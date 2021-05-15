import * as express from 'express'

import MaterialController from '../Controllers/MaterialController'
import { HasRole } from '../Middlewares/HasRole'
import { UserType } from '../Models/User'

export default (controller: MaterialController) => (router: express.Router) => {
  router
    .route('/materials')
    .get(HasRole([UserType.Admin]), controller.getAllMaterials)
  router
    .route('/materials/:id')
    .get(HasRole([UserType.Admin]), controller.getMaterialById)
  router
    .route('/materials/section/:id')
    .post(HasRole([UserType.Admin]), controller.createAndAssignMaterial)
  router
    .route('/materials/:id')
    .patch(HasRole([UserType.Admin]), controller.updateMaterial)
  router
    .route('/materials/:id/section/:sectionID')
    .delete(HasRole([UserType.Admin]), controller.deleteMaterial)

  return router
}
