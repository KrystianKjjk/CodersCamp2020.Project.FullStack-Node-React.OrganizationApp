import { GradeSheet } from '../Models/GradeSheet';
import { Repository } from './Repository';
import * as mongoose from 'mongoose';


export default class GradeSheetRepository extends Repository {
    async getParticipantGradeSheets(userId: mongoose.Types.ObjectId): Promise<GradeSheet[]> {
        const filter = {
            participants: { $elemMatch: { participantID: userId } }
        };
        const projection = {
            _id: 0,
            projectID: 1,
            participants: { $elemMatch: { participantID: userId } },
            mentorID: 1,
            reviewers: 1,
            mentorGrades: 1,
            mentorReviewerGrades: 1
        };
        return this.model.find(filter, projection);
    }

    async getMentorGradeSheets(userId: mongoose.Types.ObjectId): Promise<GradeSheet[]> {
        return this.model.find({
            $or: [
                { mentorReviewer: { $elemMatch: { mentor: userId } } },
                { mentor: userId }
            ]
        });
    }

    async addMentorReviewer(gradeSheetId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const sheet = await this.getById(gradeSheetId) as GradeSheet & mongoose.Document | null;
        if(sheet === null) return null;
        if(sheet.reviewers.includes(mentorId)) return sheet;
        sheet.reviewers.push(mentorId);
        sheet.mentorReviewerGrades.push({mentorID: mentorId, grades: {}});
        return await sheet.save();
    }

};