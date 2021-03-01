import GradeSheetRepository from '../Repositories/GradeSheetRepository';
import { GradeSheet } from '../Models/GradeSheet';
import * as mongoose from 'mongoose';


export default class UserService {
    repository: GradeSheetRepository;
    constructor(repository: GradeSheetRepository) {
        this.repository = repository;
    }

    async findGradeSheetById(id: mongoose.Types.ObjectId) {
        return this.repository.getById(id);
    }

    async getGradeSheets(): Promise<(GradeSheet & mongoose.Document<GradeSheet>)[]> {
        return this.repository.getAll();
    }

    async createUser(gradeSheet: GradeSheet) {
        gradeSheet.mentorReviewerGrades = gradeSheet.mentorReviewerGrades
            .filter(grades => gradeSheet.mentorReviewer.includes(grades.mentor));
        for (let i in gradeSheet.mentorReviewer) {
            const mentor = gradeSheet.mentorReviewer[i];
            const index = gradeSheet.mentorReviewerGrades.findIndex(grades => grades.mentor === mentor);
            if (index > 0)
                gradeSheet.mentorReviewerGrades[index] = {
                    mentor,
                    grades: {}
                }
        }
        return this.repository.create(gradeSheet);
    }

    async addMentorReviewer(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const updateQuery = {
            $push: mentorId
        }
        return await this.repository.updateById(gradeSheetId, updateQuery);
    }

    async setMentorGrade(gradeSheetId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        const updateQuery = {
            $set: {
                mentorGrade: { }
            }
        }
        updateQuery.$set.mentorGrade[gradeName] = grade;
        return await this.repository.updateById(gradeSheetId, updateQuery);
    }

    async setMentorReviewerGrade(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        const updateQuery = {
            $set: {
                mentorReviewerGrades: { }
            }
        }
        const sheet = await this.repository.getById(gradeSheetId) as GradeSheet;
        const index = sheet.mentorReviewerGrades.findIndex(grade => grade.mentor === mentorId);
        updateQuery.$set.mentorReviewerGrades[index].grades[gradeName] = grade;
        return await this.repository.updateById(gradeSheetId, updateQuery);
    }

    async deleteUser(id: mongoose.Types.ObjectId) {
        return this.repository.deleteById(id);
    }

}