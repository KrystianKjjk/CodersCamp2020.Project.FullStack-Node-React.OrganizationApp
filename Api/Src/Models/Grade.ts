//Osobne dla kazdego uczestnika, symbolizuje ocene za jeden Section (dzial) 
import * as mongoose from 'mongoose';

import {SchemaTypes} from "mongoose";

export interface Grade {
    sectionId: mongoose.Types.ObjectId,
    gradeSheetId: mongoose.Types.ObjectId,
    testPoints: number,
    testMaxPoints: number,
    taskPoints: number,
    taskMaxPoints: number,
    additionalPoints:number,
    additionalMaxPoints:number
}

const GradeSchema = new mongoose.Schema({
    sectionId: {
        type: SchemaTypes.ObjectId,
        ref: 'Section',
        required: true
    },
    gradeSheetId: {
        type: SchemaTypes.ObjectId,
        ref: 'Course'
    },
    testPoints: {
        type: Number
    },
    testMaxPoints: {
        type: Number
    },
    taskPoints: {
        type: Number
    },
    taskMaxPoints: {
        type: Number
    },
    additionalPoints: {
        type: Number
    },
    additionalMaxPoints: {
        type: Number
    }
})

export type GradeType = Grade & mongoose.Document;
export default mongoose.model<GradeType>('Grade', GradeSchema);
