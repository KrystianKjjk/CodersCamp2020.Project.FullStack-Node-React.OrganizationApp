import { Repository } from './Repository'
import { UserModel, UserStatus, UserType } from '../Models/User'
import * as mongoose from 'mongoose'
import { GradeType } from '../Models/Grade'

export default class UserRepository extends Repository {
  async getByEmail(email: string) {
    return this.model.findOne({ email })
  }

  async getByTypeAndStatus(
    type: UserType[],
    status: UserStatus[],
  ): Promise<mongoose.Document<UserModel>[]> {
    const query: { type?: any; status?: any } = {}
    if (type.length) query.type = { $in: type }

    if (status.length) query.status = { $in: status }

    return this.model.find(query)
  }

  async getUserInfoById(
    id: mongoose.Types.ObjectId,
  ): Promise<(mongoose.Document<UserModel> & UserModel) | null> {
    return this.model.findOne({ _id: id }, { _id: 0, password: 0 })
  }

  async deleteGradeById(id: mongoose.Types.ObjectId) {
    const query: object = {
      $pull: {
        grades: { _id: id },
      },
    }
    return this.model.updateOne({ 'grades._id': id }, query)
  }
  async updateGradeById(id: mongoose.Types.ObjectId, grade: GradeType) {
    const query: object = {
      $set: {
        'grades.$.sectionId': grade.sectionId,
        'grades.$.testPoints': grade.testPoints,
        'grades.$.testMaxPoints': grade.testMaxPoints,
        'grades.$.taskPoints': grade.taskPoints,
        'grades.$.taskMaxPoints': grade.taskMaxPoints,
        'grades.$.projectPoints': grade.projectPoints,
      },
    }
    return this.model.updateOne({ 'grades._id': id }, query)
  }

  async getByGradeId(gradeId: mongoose.Types.ObjectId) {
    return this.model.findOne({ 'grades._id': gradeId })
  }

  async getUsersByCourseId(courseId: mongoose.Types.ObjectId) {
    return this.model.find({ course: courseId })
  }
}
