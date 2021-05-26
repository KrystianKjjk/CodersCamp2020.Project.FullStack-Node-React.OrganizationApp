import { Repository } from './Repository'
import * as mongoose from 'mongoose'

export default class TeamProjectRepository extends Repository {
  async getAllByCourse(courseId) {
    var id = new mongoose.mongo.ObjectID(courseId)
    return this.model.aggregate([
      {
        $lookup: {
          from: 'teams',
          localField: 'teamId',
          foreignField: '_id',
          as: 'team',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'team.mentor',
          foreignField: '_id',
          as: 'mentor',
        },
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'parentProjectId',
          foreignField: '_id',
          as: 'parentProject',
        },
      },
      {
        $lookup: {
          from: 'sections',
          localField: 'parentProject.sectionId',
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
          mentor: {
            _id: 1,
            name: 1,
            surname: 1,
          },
          parentProject: {
            _id: 1,
            projectName: 1,
          },
          section: {
            _id: 1,
            name: 1,
          },
        },
      },
    ])
  }

  async findByTeamId(teamId: mongoose.Types.ObjectId) {
    return this.model.find({ teamId })
  }
  async getById(id: mongoose.Types.ObjectId) {
    return this.model
      .findOne(id)
      .populate({
        path: 'teamId',
        populate: {
          path: 'mentor',
          select: ['_id', 'name', 'surname', 'email'],
        },
      })
      .populate({
        path: 'parentProjectId',
        populate: {
          path: 'sectionId',
        },
      })
  }
  async updateForTeam(
    id: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId,
    teamProject: object,
  ) {
    return this.model.updateOne({ _id: id, teamId }, teamProject)
  }

  async deleteByIdForTeam(
    id: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId,
  ) {
    return this.model.deleteOne({ _id: id, teamId })
  }
}
