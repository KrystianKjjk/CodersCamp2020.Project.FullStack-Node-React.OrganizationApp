//Wspolne dla wszystkich uczestnikow i mentorow
import * as mongoose from 'mongoose'
import { Section } from './Section'

export interface Course {
  name: string
  sections: Section[]
  description?: string
  startDate: Date
  endDate: Date
}

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model<Course & mongoose.Document>(
  'Course',
  CourseSchema,
)
