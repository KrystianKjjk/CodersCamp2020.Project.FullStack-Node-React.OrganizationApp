import { Repository } from './Repository'
import * as mongoose from 'mongoose'

export default class ProjectRepository extends Repository {
  async getAll() {
    return this.model.find({}).populate('sectionId')
  }
  async getAllByCourse(courseId: string) {
    var id = new mongoose.mongo.ObjectID(courseId)

    return this.model.aggregate([
      {
        $lookup: {
          from: 'sections',
          localField: 'sectionId',
          foreignField: '_id',
          as: 'section',
        },
      },
      {
        $match: { 'section.course': id },
      },
      {
        $project: {
          _id: 1,
          projectName: 1,
          section: {
            _id: 1,
            name: 1,
            startDate: 1,
            endDate: 1,
          },
        },
      },
    ])
  }
  async getById(id: mongoose.Types.ObjectId) {
    return this.model.findOne(id).populate('sectionId')
  }

  async deleteById(id: mongoose.Types.ObjectId) {
    return this.model.deleteOne({ _id: id })
  }

  async create(obj: object) {
    return this.model.create(obj)
  }

  async updateById(id: mongoose.Types.ObjectId, obj: object) {
    return this.model
      .findByIdAndUpdate(id, obj, {
        new: true,
        useFindAndModify: false,
        upsert: false,
      })
      .populate('sectionId')
  }
}
