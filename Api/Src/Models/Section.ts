import * as mongoose from 'mongoose';

export interface Section {
    name: string,
    startDate: Date,
    endDate: Date,
    testDate?: Date,    //optional as it might not be known from the very start
    tests: Object[],    //table of references to tests (theoretical, practical, sample test etc.) - object interface to be prepared
    referenceProjectId?: string, //standard project proposed by the organisers (e.g. StarWars Quiz for Javascript)
    description?: string,
    materials?: string, //materials reference
    course: mongoose.Types.ObjectId
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
        validate: [endDateValidator, 'End date must be after the start date!']
    },
    testDate: {
        type: Date,
        validate: [testDateValidator, 'Test date must be between start and end dates!']
    },
    tests: {
        type: Array,
    },
    testDescription: {
        type: String,
    },
    referenceProjectId: {
        type: String,
        ref: 'Project'
    },
    description:{
        type: String,
        minLength: 16
    },
    materials:{
        type: String
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }
})

function endDateValidator(value) {
    return this.startDate < value;
}

function testDateValidator(value) {
    return this.endDate >= value && this.startDate < value;
}

export default mongoose.model<Section & mongoose.Document>('Section', SectionSchema);