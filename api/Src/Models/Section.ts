import * as mongoose from 'mongoose'

export interface Section {
  _id: mongoose.Types.ObjectId
  name: string
  startDate: Date
  endDate: Date
  tests: Test[]
  description?: string
  materials?: mongoose.Types.ObjectId[] //materials reference
  course: mongoose.Types.ObjectId
}

export type TSection = Section & mongoose.Document

export enum TestType {
  sample,
  theoretical,
  practical,
}

export interface Test {
  _id: mongoose.Types.ObjectId
  testType: TestType
  testDate: Date
  testUrl: string
  testDescription?: string
}

const TestSchema = new mongoose.Schema(
  {
    testType: {
      type: TestType,
      required: true,
    },
    testDate: {
      type: Date,
      validate: [
        testDateValidator,
        'Test date must be between start and end dates!',
      ],
    },
    testUrl: {
      type: String,
    },
    testDescription: {
      type: String,
    },
  },
  { timestamps: true },
)

export const Test = mongoose.model<Test & mongoose.Document>('Test', TestSchema)

const SectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
    validate: [endDateValidator, 'End date must be after the start date!'],
  },
  tests: {
    type: [TestSchema],
  },
  description: {
    type: String,
    minLength: 16,
  },
  materials: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
})

function endDateValidator(value) {
  return this.startDate < value
}

function testDateValidator(value) {
  return this.endDate >= value && this.startDate < value
}

export default mongoose.model<Section & mongoose.Document>(
  'Section',
  SectionSchema,
)
