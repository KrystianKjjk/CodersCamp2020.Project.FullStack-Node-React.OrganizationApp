import * as mongoose from 'mongoose'
import { Team } from '../Models/Team'
import TeamRepository from '../Repositories/TeamRepository'

class TeamService {
  teamRepository: TeamRepository
  constructor(teamRepository: TeamRepository) {
    this.teamRepository = teamRepository
  }

  async getTeams() {
    return this.teamRepository.getAll()
  }

  async getTeamsByCourseId(id: mongoose.Types.ObjectId) {
    return this.teamRepository.getTeamsByCourseId(id)
  }

  async findTeamById(id: mongoose.Types.ObjectId) {
    return this.teamRepository.getById(id)
  }

  async checkUserByMentorId(
    mentorID: mongoose.Types.ObjectId,
    userID: mongoose.Types.ObjectId,
  ) {
    return this.teamRepository.getByMentorIdAndUserId(mentorID, userID)
  }

  async getTeamByMentorId(mentorID: mongoose.Types.ObjectId) {
    return this.teamRepository.getTeamByMentorId(mentorID)
  }

  async createTeam(team: Omit<Team, '_id'>) {
    if (!team) return false
    if (!team.course) return false
    return this.teamRepository.create(team)
  }

  async updateTeam(
    id: mongoose.Types.ObjectId,
    team: Partial<Omit<Team, '_id'>>,
  ) {
    return this.teamRepository.updateById(id, team)
  }

  async deleteTeam(id: mongoose.Types.ObjectId) {
    return this.teamRepository.deleteById(id)
  }

  async addUserToTeam(
    teamId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) {
    return this.teamRepository.addUserToTeam(teamId, userId)
  }

  async addMentorToTeam(
    teamId: mongoose.Types.ObjectId,
    mentorId: mongoose.Types.ObjectId,
  ) {
    return this.teamRepository.addMentorToTeam(teamId, mentorId)
  }

  async deleteUserFromTeam(
    teamId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) {
    return this.teamRepository.deleteUserFromTeam(teamId, userId)
  }

  async deleteMentorFromTeam(teamId: mongoose.Types.ObjectId) {
    return this.teamRepository.deleteMentorFromTeam(teamId)
  }
}

export default TeamService
