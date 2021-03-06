import * as mongoose from "mongoose";

import GradeRepository from "../Repositories/GradeRepository";
import { GradeType } from "../Models/Grade";

export default class CourseService {

    constructor(private repository: GradeRepository) {}

    createGrade = async (grade: GradeType) => {
        return this.repository.create(grade);
    }
    getGrades = async () => {
        return this.repository.getAll();
    }
    findGrade = async (id: mongoose.Types.ObjectId) => {
        return this.repository.getById(id);
    }
    deleteGrade = async (id: mongoose.Types.ObjectId) => {
        return this.repository.deleteById(id);
    }
}


