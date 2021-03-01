import * as mongoose from 'mongoose';

export interface GradeSheet {
    projectID: mongoose.Types.ObjectId;
    angagement: number;
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
        required: true,
        ref: 'Project'
    },
    angagement: {
        type: Number, 
        required: true,
    },
    mentorReviewer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    mentorReviewerGrades: [{
        mentor: mongoose.Schema.Types.ObjectId,
        grades: {
            type: Object,
            required: true
        }
    }]
  }, {timestamps: true});

  export default mongoose.model<GradeSheet & mongoose.Document>('GradeSheet', GradeSheetSchema);