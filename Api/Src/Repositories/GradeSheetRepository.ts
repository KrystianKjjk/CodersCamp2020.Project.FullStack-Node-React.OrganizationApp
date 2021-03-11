import { GradeSheet } from '../Models/GradeSheet';
import { Repository } from './Repository';
import * as mongoose from 'mongoose';


export default class GradeSheetRepository extends Repository { 
    async getReviewerGrades(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        return await this.model.findOne({_id: gradeSheetId}, {mentorReviewerGrades: 1, _id: 0});
    }

    async addMentorReviewer(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const sheet = await this.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        if(sheet.mentorReviewer.includes(mentorId)) return sheet;
        sheet.mentorReviewer.push(mentorId);
        sheet.mentorReviewerGrades.push({mentor: mentorId, grades: {}});
        return await sheet.save();
    }

    async setMentorReviewers(gradeSheetId: mongoose.Types.ObjectId, mentorIds: mongoose.Types.ObjectId[]) {
        const updateQuery = {
            mentorReviewer: mentorIds,
            $pull: {
                mentorReviewerGrades: { mentor: { $not: { $in: mentorIds } } }
            }
        }
        return await this.updateById(gradeSheetId, updateQuery);
    }

    async setMentorReviewerGrade(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        const grades = {};
        grades[gradeName] = grade;
        const sheet = await this.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if( !(sheet.mentorReviewer.includes(mentorId)) ) return null;
        const index = sheet.mentorReviewerGrades.findIndex(grade => `${grade.mentor}` === `${mentorId}`);
        if (index > -1)
            sheet.mentorReviewerGrades[index].grades[gradeName] = grade;
        else 
            sheet.mentorReviewerGrades.push({mentor: mentorId, grades});
        sheet.markModified('mentorReviewerGrades');
        return await sheet.save();
    }

};