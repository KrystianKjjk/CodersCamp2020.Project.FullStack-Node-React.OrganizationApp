import * as express from 'express';
import * as mongoose from "mongoose";

import GradeService from "../Services/GradeService";
import GradeSchema from "../Models/Grade";

export default class GradeController {

    constructor(private service: GradeService) {}

    createGrade = async ( req: express.Request, res: express.Response, next?: express.NextFunction) => {
        try {
            const grade = new GradeSchema(req.body);
            await grade.validate();
            await this.service.createGrade(grade);
            return res.status(201).json(grade);
        }
        catch (err) {
            const msg = {message: err.message};
            return (err.name === "ValidationError") ?
                res.status(400).json(msg)
                : res.status(500).json(msg);
        }
    }

    getAllGrades = async ( req: express.Request, res: express.Response, next?: express.NextFunction) => {
        try {
            const grades = await this.service.getGrades();
            return res.status(200).json(grades);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    getGrade = async ( req: express.Request, res: express.Response, next?: express.NextFunction) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const grade = await this.service.findGrade(id);
            return grade ?
                res.status(200).json(grade)
                : res.status(404).json({ message: "Course not found" });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    updateGrade = async ( req: express.Request, res: express.Response, next?: express.NextFunction) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const grade = new GradeSchema(req.body);
            grade._id = id;
            await grade.validate();
            const updatedGrade = await this.service.updateGrade(id, grade);
            return updatedGrade ?
                res.status(201).json(updatedGrade)
                : res.status(404).json({ message: "Grade not found" });
        } catch (err) {
            const msg = { message: err.message };
            return err.name === "ValidationError" ?
                res.status(400).json(msg)
                : res.status(500).json(msg);
        }
    }

    deleteGrade = async ( req: express.Request, res: express.Response, next?: express.NextFunction) => {
       try {
           const id = new mongoose.Types.ObjectId(req.params.id);
           const grade = await this.service.deleteGrade(id);
           return grade ?
               res.status(200).json(grade)
               : res.status(404).json({ message: "Course not found" });
       }
       catch (error) {
           return res.status(500).json({ message: error.message });
        }
    }
}
