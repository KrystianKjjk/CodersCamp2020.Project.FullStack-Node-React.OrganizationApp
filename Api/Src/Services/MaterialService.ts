import * as express from "express";
import * as mongoose from "mongoose";

import MaterialRepository from "../Repositories/MaterialRepository";
import MaterialSchema from "../Models/Material";
import GradeSchema from "../Models/Grade";


export default class MaterialService {

    constructor(private repository: MaterialRepository) {}

    createMaterial = async ( req: express.Request ) => {
        const material = new MaterialSchema(req.body);
        await material.validate();
        return this.repository.create(material);
    }

    getAllMaterials = async () => {
        return this.repository.getAll();
    }

    getMaterialById = async ( req: express.Request ) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        return this.repository.getById(id);
    }

    updateMaterial = async ( req: express.Request ) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const material = new GradeSchema(req.body);
        material._id = id;
        await material.validate();
        return this.repository.updateById(id, material);
    }

    deleteMaterial = async ( req: express.Request ) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        return this.repository.deleteById(id);
    }
}


