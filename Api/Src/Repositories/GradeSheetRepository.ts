import { GradeSheet } from '../Models/GradeSheet';
import { Repository } from './Repository';
import * as mongoose from 'mongoose';

export default class GradeSheetRepository extends Repository { 
    async addMentorReviewer(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const updateQuery = {
            $push: {
                mentorReviewer: mentorId,
                mentorReviewerGrades: {
                    mentor: mentorId,
                    grades: { }
                }
            }
        }
        return await this.updateById(gradeSheetId, updateQuery);
    }

    async setMentorReviewers(gradeSheetId: mongoose.Types.ObjectId, mentorIds: mongoose.Types.ObjectId[]) {
        const updateQuery = {
            mentorReviewer: mentorIds
        }
        return await this.updateById(gradeSheetId, updateQuery);
    }

    async setMentorGrade(gradeSheetId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        const updateQuery = {
            $set: { }
        }
        updateQuery.$set[`mentorGrades.${gradeName}`] = grade;
        return await this.updateById(gradeSheetId, updateQuery);
    }

    async setMentorReviewerGrade(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        const updateQuery = {
            $set: { }
        }
        const sheet = await this.getById(gradeSheetId) as GradeSheet;
        const index = sheet.mentorReviewerGrades.findIndex(grade => `${grade.mentor}` === `${mentorId}`);
        console.log(index);
        if (index > -1) {
            updateQuery.$set[`mentorReviewerGrades.${index}.grades.${gradeName}`] = grade;
            return await this.updateById(gradeSheetId, updateQuery);
        } else return null;
    }

};