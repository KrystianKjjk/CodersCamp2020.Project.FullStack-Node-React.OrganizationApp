import * as express from 'express'

import MaterialService from '../Services/MaterialService'

export default class MaterialController {
  constructor(private materialService: MaterialService) {}

  createAndAssignMaterial = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const material = await this.materialService.createMaterial(req)
    return res.status(201).json(material)
  }

  getAllMaterials = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const materials = await this.materialService.getAllMaterials()
    return res.status(200).json(materials)
  }

  getMaterialById = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const material = await this.materialService.getMaterialById(req)
    return res.status(200).json(material)
  }

  updateMaterial = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const material = await this.materialService.updateMaterial(req)
    return res.status(200).json(material)
  }

  deleteMaterial = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const material = await this.materialService.deleteMaterial(req)
    return res.status(200).json(material)
  }
}
