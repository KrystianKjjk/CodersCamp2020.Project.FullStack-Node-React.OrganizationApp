import { Repository } from './Repository'
import * as mongoose from 'mongoose'
import { Team } from '../Models/Team'

export default class TeamRepository extends Repository {
  async getAll() {
    return this.model.find({}).populate('users').populate('mentor')
  }

  async getById(id: mongoose.Types.ObjectId): Promise<Team> {
    return this.model.findOne(id).populate('users').populate('mentor')
  }

  async getByMentorId(id: mongoose.Types.ObjectId): Promise<Team> {
    return this.model
      .findOne({ mentor: id })
      .populate('users')
      .populate('mentor')
  }

  async getTeamsByCourseId(id: mongoose.Types.ObjectId) {
    return this.model.find({ course: id }).populate('users').populate('mentor')
  }

  async create(obj: object) {
    return this.model.create(obj)
  }

  async addUserToTeam(
    teamId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) {
    const updateQuery = {
      $push: {
        users: userId,
      },
    }

    return await this.updateById(teamId, updateQuery)
  }

  async deleteUserFromTeam(
    teamId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) {
    const updateQuery = {
      $pull: {
        users: userId,
      },
    }
    return await this.updateById(teamId, updateQuery)
  }

  async addMentorToTeam(
    teamId: mongoose.Types.ObjectId,
    mentorId: mongoose.Types.ObjectId,
  ) {
    const updateQuery = {
      mentor: mentorId,
    }

    return await this.updateById(teamId, updateQuery)
  }

  async deleteMentorFromTeam(teamId: mongoose.Types.ObjectId) {
    const updateQuery = {
      mentor: null,
    }

    return await this.updateById(teamId, updateQuery)
  }

  async getByMentorIdAndUserId(
    mentorID: mongoose.Types.ObjectId,
    userID: mongoose.Types.ObjectId,
  ) {
    return this.model.findOne({ mentor: mentorID }).find({ users: userID })
  }
  async getTeamByMentorId(mentorID: mongoose.Types.ObjectId) {
    return this.model.findOne({ mentor: mentorID })
  }
}
