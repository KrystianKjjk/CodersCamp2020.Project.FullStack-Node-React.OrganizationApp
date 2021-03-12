import * as mongoose from 'mongoose';

export interface Participant {
    participantID: mongoose.Types.ObjectId;
    engagement?: number;
    role?: string;
    rolePoints?: number;
};

export interface GradeSheet {
    projectID: mongoose.Types.ObjectId;
    participants: Participant[];
    mentorReviewer: mongoose.Types.ObjectId[];
    mentorGrades: {
        [prop: string]: number;
    };
    mentorReviewerGrades: Array< {
        mentor: mongoose.Types.ObjectId;
        grades: {
            [prop: string]: number;
        };
    } >;
};

const GradeSheetSchema = new mongoose.Schema({
    projectID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        required: true
    },
    participants: [{
        participantID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        engagement: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            default: ''
        },
        rolePoints: {
            type: Number,
            default: 0
        }
    }],
    mentorReviewer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    mentorGrades: {
        type: Object,
        default: {}
    },
    mentorReviewerGrades: [{
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        grades: {
            type: Object,
            default: {}
        }
    }]
  }, {timestamps: true});

  export default mongoose.model<GradeSheet & mongoose.Document>('GradeSheet', GradeSheetSchema);