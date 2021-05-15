import * as mongoose from 'mongoose'
import { Grade, GradeSchema, GradeType } from './Grade'
import * as Joi from 'joi'
const passwordComplexity = require('joi-password-complexity')

export enum UserType {
  Candidate,
  Participant,
  Mentor,
  Admin,
}

export enum UserStatus {
  Active,
  Resigned,
  Archived,
}

export interface UserModel {
  _id: mongoose.Types.ObjectId
  name: string
  surname: string
  email: string
  type: UserType
  password: string
  status: UserStatus
  grades: Grade[]
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
      unique: true,
    },
    type: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    grades: [
      {
        type: Object,
        required: false,
      },
    ],
  },
  { timestamps: true },
)

export function validateUserRegistration(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    surname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    // default: min: 8, max: 26, lowerCase: 1, upperCase: 1, numeric: 1, symbol: 1, requirementCount: 4,
    password: passwordComplexity().required(),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  })

  return schema.validate(user)
}

export function validateUserLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(26).required(),
  })

  return schema.validate(user)
}

export default mongoose.model<UserModel & mongoose.Document>('User', UserSchema)
