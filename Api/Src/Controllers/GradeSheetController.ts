import GradeSheetModel from '../Models/GradeSheet';
import GradeSheetService from '../Services/GradeSheetService';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

export default class GradeSheetController {
    gradeSheetService: GradeSheetService;
    constructor(gradeSheetService: GradeSheetService) {
        this.gradeSheetService = gradeSheetService;
    }

    getGradeSheet = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const sheet = await this.gradeSheetService.findGradeSheetById(id);
        if(!sheet) return res.status(404).json({message: 'Grade sheet not found'});
        res.status(200).json(sheet);
    }

    getGradeSheets = async (req: Request, res: Response) => {
        const sheets = await this.gradeSheetService.getGradeSheets();
        res.status(200).json(sheets);
    }

    addMentorReviewer = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const mentorId = new mongoose.Types.ObjectId(req.params.mentorId);
        const sheet = await this.gradeSheetService.addMentorReviewer(id, mentorId);
        if(sheet === null) return res.status(404).json({message: 'Grade sheet not found'});
        res.status(200).json({message: 'Mentor reviewer added'});
    }

    setMentorReviewers = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        if ( !(req.body.mentorIds instanceof Array) )
            return res.status(400).json({
                message: "MentorIds should be an array of strings"
            })
        const mentorIds = req.body.mentorIds.map((id: string) => new mongoose.Types.ObjectId(id));
        const sheet = await this.gradeSheetService.setMentorReviewers(id, mentorIds);
        if(sheet === null) return res.status(404).json({message: 'Grade sheet not found'});
        res.status(200).json({message: 'Mentor reviewers set'});
    }

    setMentorGrade = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const gradeName: string = req.body.gradeName;
        const grade: number = req.body.grade;
        const sheet = await this.gradeSheetService.setMentorGrade(id, gradeName, grade);
        if(sheet === null) return res.status(404).json({message: 'Grade sheet not found'});
        res.status(200).json({message: 'Mentor grade set'});
    }

    setMentorReviewerGrade = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const mentorId = new mongoose.Types.ObjectId(req.params.mentorId);
        const gradeName: string = req.body.gradeName;
        const grade: number = req.body.grade;
        const sheet = await this.gradeSheetService.setMentorReviewerGrade(id, mentorId, gradeName, grade);
        if(sheet === null) return res.status(404).json({message: 'Grade sheet or mentor not found'});
        res.status(200).json({message: 'Mentor reviewer grade set'});
    }

    deleteGradeSheet = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const sheet = await this.gradeSheetService.deleteGradeSheet(id);
        if(!sheet) return res.status(404).json({message: 'Grade sheet not found'});
        res.status(200).json({message: 'Grade sheet deleted'});
    }
    
    createGradeSheet = async (req: Request, res: Response) => {
        try {
            const sheet = new GradeSheetModel(req.body);
            await sheet.validate();
            await this.gradeSheetService.createGradeSheet(sheet);
            res.status(201).json({message: 'Grade sheet created'});
        } catch(err) {
            if(err.name === 'ValidationError')
                return res.status(400).json({message: err.message})
            res.status(500).json({message: err.message});
        }
    }

}