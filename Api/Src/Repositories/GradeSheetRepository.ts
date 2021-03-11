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
            mentorReviewer: 1,
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

};