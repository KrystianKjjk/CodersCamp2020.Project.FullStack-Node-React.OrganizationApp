import GradeSheetRepository from '../Repositories/GradeSheetRepository';
import { GradeSheet, Participant } from '../Models/GradeSheet';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';


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

    async addParticipant(gradeSheetId: mongoose.Types.ObjectId, participantId: mongoose.Types.ObjectId) {
        const sheet = await this.repository.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        if(sheet.participants.findIndex((part) => `${part.participantID}` === `${participantId}`) > -1) return sheet;
        sheet.participants.push({
            participantID: participantId,
        });
        sheet.markModified('participants');
        return await this.repository.save(sheet);
    }

    async setParticipants(gradeSheetId: mongoose.Types.ObjectId, participants: Participant[]) {
        const sheet = await this.repository.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        for (let i in participants){
            const index = sheet.participants.findIndex((part) => `${part.participantID}` === `${participants[i].participantID}`);
            if(index > -1)
                Object.assign(sheet.participants[index], _.omit(participants[i], ['participantID', '_id']));
            else
                sheet.participants.push(participants[i]);
        }
        sheet.markModified('participants');
        return await this.repository.save(sheet);
    }

    async updateParticipants(gradeSheetId: mongoose.Types.ObjectId, participants: Participant[]) {
        const sheet = await this.repository.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        for (let i in participants){
            const index = sheet.participants.findIndex((part) => `${part.participantID}` === `${participants[i].participantID}`);
            if(index === -1) continue;
            Object.assign(sheet.participants[index], _.omit(participants[i], ['participantID', '_id']));
        }
        sheet.markModified('participants');
        return await this.repository.save(sheet);
    }
    
    async removeParticipant(gradeSheetId: mongoose.Types.ObjectId, participantId: mongoose.Types.ObjectId) {
        const sheet = await this.repository.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        const index = sheet.participants.findIndex((part) => `${part.participantID}` === `${participantId}`)
        if(index === -1) return null;
        sheet.participants.splice(index, 1);
        sheet.markModified('participants');
        return await this.repository.save(sheet);
    }

    async deleteGradeSheet(id: mongoose.Types.ObjectId) {
        return this.repository.deleteById(id);
    }

}