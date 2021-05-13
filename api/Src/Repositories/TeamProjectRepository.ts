import { Repository } from './Repository'
import * as mongoose from 'mongoose'

export default class TeamProjectRepository extends Repository {
  async getAll() {
    return this.model
      .find({})
      .populate({
        path: 'teamId',
        select: 'mentor',
        populate: { path: 'mentor', select: ['_id', 'name', 'surname'] },
      })
      .populate({
        path: 'parentProjectId',
        select: ['id', 'projectName', 'sectionId'],
        populate: { path: 'sectionId', select: ['id', 'name'] },
      })
      .select(['id', 'projectName', 'teamId', 'parentProjectId'])
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
