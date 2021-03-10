import { GradeSheet, Participant } from '../Models/GradeSheet';
import { Repository } from './Repository';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

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

    async addParticipant(gradeSheetId: mongoose.Types.ObjectId, participantId: mongoose.Types.ObjectId) {
        const sheet = await this.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        if(sheet.participants.findIndex((part) => `${part.participantID}` === `${participantId}`) > -1) return sheet;
        sheet.participants.push({
            participantID: participantId,
        });
        return await sheet.save();
    }

    async setParticipants(gradeSheetId: mongoose.Types.ObjectId, participants: Participant[]) {
        const sheet = await this.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        for (let i in participants){
            const index = sheet.participants.findIndex((part) => `${part.participantID}` === `${participants[i].participantID}`);
            if(index > -1)
                Object.assign(sheet.participants[index], _.omit(participants[i], ['participantID', '_id']));
            else
                sheet.participants.push(participants[i]);
        }
        sheet.markModified('participants');
        return await sheet.save();
    }

    async removeParticipant(gradeSheetId: mongoose.Types.ObjectId, participantId: mongoose.Types.ObjectId) {
        const sheet = await this.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        const index = sheet.participants.findIndex((part) => `${part.participantID}` === `${participantId}`)
        if(index > -1) return null;
        sheet.participants.splice(index);
        return await sheet.save();
    }

    async updateParticipants(gradeSheetId: mongoose.Types.ObjectId, participants: Participant[]) {
        const sheet = await this.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        for (let i in participants){
            const index = sheet.participants.findIndex((part) => `${part.participantID}` === `${participants[i].participantID}`);
            if(index === -1) continue;
            Object.assign(sheet.participants[index], _.omit(participants[i], ['participantID', '_id']));
        }
        sheet.markModified('participants');
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

    async setMentorGrade(gradeSheetId: mongoose.Types.ObjectId, gradeName: string, grade: number) {
        const updateQuery = {
            $set: { }
        }
        updateQuery.$set[`mentorGrades.${gradeName}`] = grade;
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