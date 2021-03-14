import * as express from "express";
import * as mongoose from "mongoose";

import MaterialRepository from "../Repositories/MaterialRepository";
import MaterialSchema from "../Models/Material";
import GradeSchema from "../Models/Grade";
import SectionService from "./SectionService";
import { TSection } from "../Models/Section";


export default class MaterialService {

    constructor(private repository: MaterialRepository, private sectionService: SectionService) {}

    createMaterial = async ( req: express.Request ) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const material = new MaterialSchema(req.body);
        await material.validate();

        let section: TSection = await this.sectionService.getSectionById(id);
        section.materials.push(material._id);
        await this.sectionService.updateSection(id, section);
        await this.repository.create(material);

        return material;
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
        await this.repository.updateById(id, material);
        return material;
    }

    deleteMaterial = async ( req: express.Request ) => {
        const idMaterial = new mongoose.Types.ObjectId(req.params.id);
        const idSection = new mongoose.Types.ObjectId(req.params.sectionID);

        let section: TSection = await this.sectionService.getSectionById(idSection);
        section.materials.forEach( (material, index) => {
            if( material.equals(idMaterial)) {
                section.materials.splice(index, 1);
            }
        })
        await this.sectionService.updateSection(idSection, section);
        return this.repository.deleteById(idMaterial);
    }
}


