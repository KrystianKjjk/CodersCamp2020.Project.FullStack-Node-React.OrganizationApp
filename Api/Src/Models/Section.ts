import * as mongoose from 'mongoose';

export interface Section {
    name: string,
    startDate: Date,
    endDate: Date,
    testDate?: Date,    //optional as it might not be known from the very start
    testLink?: string,
    testDescription?: string,
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
        validate: [endDateValidator, 'End date must be after the start date!']
    },
    testDate: {
        type: Date,
        validate: [testDateValidator, 'Test date must be between start and end dates!']
    },
    testLink: {
        type: String,
    },
    testDescription: {
        type: String,
    },
    description:{
        type: String,
        minLength: 16
    },
    materials:{
        type: String
    }
})

function endDateValidator(value) {
    return this.startDate < value;
}

function testDateValidator(value) {
    return this.endDate >= value && this.startDate < value;
}

export default mongoose.model<Section & mongoose.Document>('Section', SectionSchema);