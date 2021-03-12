import GradeSheetRepository from '../Repositories/GradeSheetRepository';
import { GradeSheet } from '../Models/GradeSheet';
import * as mongoose from 'mongoose';


export default class GradeSheetService {
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

    async getReviewerGrades(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const sheet = await this.findGradeSheetById(gradeSheetId) as GradeSheet;
        return sheet.mentorReviewerGrades.find((elem) => `${elem.mentor}` === `${mentorId}`);
    }

    async createGradeSheet(gradeSheet: GradeSheet) {
        if(!gradeSheet.participants) gradeSheet.participants = [];
        if(!gradeSheet.mentorGrades) gradeSheet.mentorGrades = {};
        if(!gradeSheet.mentorReviewerGrades) gradeSheet.mentorReviewerGrades = [];
        if(!gradeSheet.mentorReviewer) gradeSheet.mentorReviewer = [];
        gradeSheet.mentorReviewerGrades = gradeSheet.mentorReviewerGrades
            .filter(grades => gradeSheet.mentorReviewer.includes(grades.mentor));
        for (let i in gradeSheet.mentorReviewer) {
            const mentor = gradeSheet.mentorReviewer[i];
            const index = gradeSheet.mentorReviewerGrades.findIndex(grades => grades.mentor === mentor);
            if (index === -1 )
                gradeSheet.mentorReviewerGrades.push({
                    mentor,
                    grades: {}
                });
        }
        return this.repository.create(gradeSheet);
    }

    async addMentorReviewer(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        return await this.repository.addMentorReviewer(gradeSheetId, mentorId);
    }

    async setMentorReviewers(gradeSheetId: mongoose.Types.ObjectId, mentorIds: mongoose.Types.ObjectId[]) {
        return await this.repository.setMentorReviewers(gradeSheetId, mentorIds);
    }

    async setMentorGrade(gradeSheetId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        return await this.repository.setMentorGrade(gradeSheetId, gradeName, grade);
    }

    async setMentorReviewerGrade(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        return await this.repository.setMentorReviewerGrade(gradeSheetId, mentorId, gradeName, grade);
    }

    async deleteGradeSheet(id: mongoose.Types.ObjectId) {
        return this.repository.deleteById(id);
    }

}