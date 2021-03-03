import * as mongoose from 'mongoose';

export interface Section {
    projectId: string,
    name: string,
    startDate: Date,
    endDate: Date,
    description?: string
    materials?: Object
}

const SectionSchema = new mongoose.Schema({
    projectId: {
        type: String 
    },
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
    description:{
        type: String
    },
    materials:{
        type: Object
    }
})

export default mongoose.model<Section & mongoose.Document>('Section', SectionSchema);