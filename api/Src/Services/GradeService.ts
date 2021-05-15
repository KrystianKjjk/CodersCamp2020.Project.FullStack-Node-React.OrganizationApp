import * as mongoose from 'mongoose'

import GradeSchema, { GradeType } from '../Models/Grade'
import UserService from './UserService'
import * as express from 'express'
import { UserModel } from '../Models/User'

type IUser = UserModel & mongoose.Document

export default class GradeService {
  constructor(private userService: UserService) {}

  createGrade = async (req: express.Request) => {
    const grade = new GradeSchema(req.body)
    await grade.validate()

    const userId = new mongoose.Types.ObjectId(req.params.userID)
    let user: IUser = await this.userService.findUserById(userId)
    if (!user) throw new Error("User doesn't exists")

    user.password = undefined
    user.grades.push(grade)

    await this.userService.updateUser(user._id, user)
    return grade
  }

  findGrades = async (req: express.Request) => {
    const id = new mongoose.Types.ObjectId(req.params.userID)
    const user = await this.userService.findUserById(id)
    if (!user) throw new Error("User doesn't exists")
    return user.grades
  }
  updateGrade = async (req: express.Request) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const grade = new GradeSchema(req.body)
    grade._id = id
    await grade.validate()
    return this.userService.updateGradeById(id, grade)
  }

  deleteGrade = async (req: express.Request) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    return this.userService.deleteGradeById(id)
  }
}
