import * as mongoose from 'mongoose'
import * as Joi from 'joi'

export interface Participant {
  participantID: mongoose.Types.ObjectId
  engagement?: number
  role?: string
  rolePoints?: number
}

export interface Grade {
  description?: string
  points: number
  comment?: string
}

export interface GradeSheet {
  projectID: mongoose.Types.ObjectId
  participants: Participant[]
  mentorID: mongoose.Types.ObjectId
  reviewers: mongoose.Types.ObjectId[]
  mentorGrades: {
    [prop: string]: Grade
  }
  mentorReviewerGrades: Array<{
    mentorID: mongoose.Types.ObjectId
    grades: {
      [prop: string]: Grade
    }
  }>
}

const GradeSheetSchema = new mongoose.Schema(
  {
    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TeamProject',
      required: true,
    },
    mentorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [
      {
        participantID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        engagement: {
          type: Number,
          default: 0,
        },
        role: {
          type: String,
          default: '',
        },
        rolePoints: {
          type: Number,
          default: 0,
        },
      },
    ],
    reviewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    mentorGrades: {
      type: Object,
      default: {},
    },
    mentorReviewerGrades: [
      {
        mentorID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        grades: {
          type: Object,
          default: {},
        },
      },
    ],
  },
  { timestamps: true },
)

function validateId(id: any) {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id is invalid')
  return id
}

export function validateParticipants(participants: any) {
  const joiParticipant = Joi.object({
    participantID: Joi.custom(validateId).required(),
    engagement: Joi.number(),
    role: Joi.string(),
    rolePoints: Joi.number(),
  })
  const joiParticipants = Joi.array().items(joiParticipant)
  return joiParticipants.validate(participants)
}

function validateGrade(grades: { [quality: string]: Grade }) {
  const nameIsString = Object.keys(grades).every(
    (name) => typeof name === 'string',
  )
  const gradeIsNumber = Object.values(grades).every(
    (grade: Grade) => typeof grade.points === 'number',
  )
  if (nameIsString && gradeIsNumber) return grades
  throw new Error('some grade is invalid')
}

export function validateGrades(grades: any) {
  const schema = Joi.custom(validateGrade)
  return schema.validate(grades)
}

export function validateReviewers(reviewers: any) {
  const joiReviewer = Joi.custom(validateId)
  const joiReviewers = Joi.array().items(joiReviewer)
  return joiReviewers.validate(reviewers)
}

export default mongoose.model<GradeSheet & mongoose.Document>(
  'GradeSheet',
  GradeSheetSchema,
)
