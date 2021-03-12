import { Request, Response } from "express";
import * as mongoose from 'mongoose';
import TestService from '../Services/TestService';

export default class TestController {
    service: TestService;
    constructor(service: TestService) {
        this.service = service;
    }

    addTest = async (req: Request, res: Response) => {
        const sectionId = new mongoose.Types.ObjectId(req.params.id);
        const object = new mongoose.Types.ObjectId(req.body.test);
        const section = await this.service.addTest(sectionId, object);
        if(!section) return res.status(404).json({message: 'Section not found'});
        res.status(200).json({message: 'Test added to section'});
    }

    deleteTest = async (req: Request, res: Response) => {
        const sectionId = new mongoose.Types.ObjectId(req.params.sectionId);
        const testId = new mongoose.Types.ObjectId(req.params.userId);
        const section = await this.service.getSectionById(sectionId);
        if (!section) res.status(404).json({message: 'Section not found'});
        await this.service.deleteTest(sectionId, testId);
        res.status(200).json({message: 'Test was deleted'});
    }
}