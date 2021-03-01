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

const GradesSchema = new mongoose.Schema({
    grades: {
        type: Object,
        default: {}
    }
})

const GradeSheetSchema = new mongoose.Schema({
    projectID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        required: true
    },
    angagement: {
        type: Number, 
        default: NaN,
    },
    mentorReviewer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    mentorGrades: GradesSchema,
    mentorReviewerGrades: [{
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        grades: GradesSchema
    }]
  }, {timestamps: true});

  export default mongoose.model<GradeSheet & mongoose.Document>('GradeSheet', GradeSheetSchema);