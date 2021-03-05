import * as mongoose from 'mongoose';

export interface Section {
    name: string,
    startDate: Date,
    endDate: Date,
    testDate?: Date,    //optional as it might not be known from the very start
    description?: string
    materials?: string //materials reference
}

const SectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: new Date(),
    },
    endDate: {
        type: Date,
    },
    testDate: {
        type: Date,
    },
    description:{
        type: String
    },
    materials:{
        type: String
    }
})

export default mongoose.model<Section & mongoose.Document>('Section', SectionSchema);