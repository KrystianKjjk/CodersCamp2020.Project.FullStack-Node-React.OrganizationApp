import { GradeSheet } from '../Models/GradeSheet';
import { Repository } from './Repository';
import * as mongoose from 'mongoose';

export default class GradeSheetRepository extends Repository { 
    async addMentorReviewer(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const updateQuery = {
            $push: mentorId
        }
        return await this.updateById(gradeSheetId, updateQuery);
    }

    async setMentorGrade(gradeSheetId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        const updateQuery = {
            $set: {
                mentorGrade: { }
            }
        }
        updateQuery.$set.mentorGrade[gradeName] = grade;
        return await this.updateById(gradeSheetId, updateQuery);
    }

    async setMentorReviewerGrade(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        const updateQuery = {
            $set: {
                mentorReviewerGrades: { }
            }
        }
        const sheet = await this.getById(gradeSheetId) as GradeSheet;
        const index = sheet.mentorReviewerGrades.findIndex(grade => grade.mentor === mentorId);
        updateQuery.$set.mentorReviewerGrades[index].grades[gradeName] = grade;
        return await this.updateById(gradeSheetId, updateQuery);
    }

    async createGrade(obj: GradeSheet) {
        obj.mentorReviewerGrades = obj.mentorReviewerGrades
            .filter(grades => obj.mentorReviewer.includes(grades.mentor));
        for (let i in obj.mentorReviewer) {
            const mentor = obj.mentorReviewer[i];
            const index = obj.mentorReviewerGrades.findIndex(grades => grades.mentor === mentor);
            if (index > 0)
                obj.mentorReviewerGrades[index] = {
                    mentor,
                    grades: {}
                }
        }
        this.create(obj);
    }

};