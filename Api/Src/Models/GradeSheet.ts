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
    mentorID: mongoose.Types.ObjectId;
    reviewers: mongoose.Types.ObjectId[];
    mentorGrades: {
        [prop: string]: number;
    };
    mentorReviewerGrades: Array< {
        mentorID: mongoose.Types.ObjectId;
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
    mentorID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
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
    reviewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    mentorGrades: {
        type: Object,
        default: {}
    },
    mentorReviewerGrades: [{
        mentorID: {
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