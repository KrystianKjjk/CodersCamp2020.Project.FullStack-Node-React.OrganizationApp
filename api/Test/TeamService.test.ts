import * as mongoose from 'mongoose'
import TeamRepository from '../Src/Repositories/TeamRepository'
import TeamService from '../Src/Services/TeamService'
import TeamModel, { Team } from '../Src/Models/Team'

export class TestTeamsRepository extends TeamRepository {
  private teams: Array<Team> = []

  constructor() {
    super(TeamModel)
  }

  async getAll() {
    return this.teams
  }

  async getById(id: mongoose.Types.ObjectId) {
    return this.teams.find((teams) => teams._id === id)
  }

  async getTeamsByCourseId(course: mongoose.Types.ObjectId) {
    const teams = this.teams.filter((team) => course.equals(team.course))
    return teams
  }

  async getByMentorId(mentorId: mongoose.Types.ObjectId) {
    const team = this.teams.find((team) => mentorId.equals(team.mentor))
    return team
  }

  async create(team: Team) {
    this.teams = [...this.teams, team]
  }

  async updateById(id: mongoose.Types.ObjectId, teamData: Partial<Team>) {
    const teamIndex = this.teams.findIndex((team) => team._id === id)
    if (teamIndex === -1) return null

    const teamAfterUpdate = { ...this.teams[teamIndex], ...teamData }
    this.teams[teamIndex] = teamAfterUpdate

    return teamAfterUpdate
  }

  async deleteById(id: mongoose.Types.ObjectId) {
    return (this.teams = this.teams.filter((team) => team._id !== id))
  }

  async addUserToTeam(
    teamId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) {
    const teamIndex = this.teams.findIndex((team) => team._id === teamId)
    this.teams[teamIndex].users.push(userId)

    return this.teams[teamIndex]
  }

  async addMentorToTeam(
    teamId: mongoose.Types.ObjectId,
    mentorId: mongoose.Types.ObjectId,
  ) {
    const teamIndex = this.teams.findIndex((team) => team._id === teamId)
    this.teams[teamIndex].mentor = mentorId

    return this.teams[teamIndex]
  }

  async deleteUserFromTeam(
    teamId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) {
    const teamIndex = this.teams.findIndex((team) => team._id === teamId)
    this.teams[teamIndex].users = this.teams[teamIndex].users.filter(
      (user) => user !== userId,
    )

    return this.teams[teamIndex]
  }

  async deleteMentorFromTeam(teamId: mongoose.Types.ObjectId) {
    const teamIndex = this.teams.findIndex((team) => team._id === teamId)
    this.teams[teamIndex].mentor = null

    return this.teams[teamIndex]
  }
}

describe('Teams Service', () => {
  let service: TeamService
  const courseId = mongoose.Types.ObjectId()

  const team1 = {
    _id: mongoose.Types.ObjectId(),
    mentor: mongoose.Types.ObjectId(),
    users: [mongoose.Types.ObjectId()],
    course: courseId,
  }

  const team2 = {
    _id: mongoose.Types.ObjectId(),
    mentor: mongoose.Types.ObjectId(),
    users: [mongoose.Types.ObjectId()],
    course: courseId,
  }

  beforeEach(() => {
    service = new TeamService(new TestTeamsRepository())
  })

  it('persists team model', async () => {
    await service.createTeam(team1)
    const fetchedTeam = await service.findTeamById(team1._id)

    expect(fetchedTeam).toEqual(team1)
  })

  it('can list out all teams', async () => {
    await service.createTeam(team1)
    await service.createTeam(team2)
    const allTeams = await service.getTeams()

    expect(allTeams).toHaveLength(2)
  })

  it('should delete a team', async () => {
    await service.createTeam(team1)
    await service.deleteTeam(team1._id)
    const allTeams = await service.getTeams()

    expect(allTeams).toHaveLength(0)
  })

  it('should update a team', async () => {
    await service.createTeam(team1)
    const updatedTeam = await service.updateTeam(team1._id, {
      mentor: mongoose.Types.ObjectId(),
    })

    expect(updatedTeam.mentor).not.toEqual(team1.mentor) // changed
    expect(updatedTeam.users).toEqual(team1.users) // stayed the same
  })

  it('should add new users to team and delete these users from a team', async () => {
    await service.createTeam(team1)
    const newUser = mongoose.Types.ObjectId()
    const updatedTeamAfterAddingUser = await service.addUserToTeam(
      team1._id,
      newUser,
    )
    expect(updatedTeamAfterAddingUser.users.includes(newUser)).toBeTruthy()

    const updatedTeamAfterDeletingUser = await service.deleteUserFromTeam(
      team1._id,
      newUser,
    )
    expect(updatedTeamAfterDeletingUser.users.includes(newUser)).toBeFalsy()
  })

  it('should add new mentor to a team', async () => {
    await service.createTeam(team1)
    const newMentor = mongoose.Types.ObjectId()
    const updatedTeam = await service.addMentorToTeam(team1._id, newMentor)

    expect(updatedTeam.mentor).toEqual(newMentor)
  })

  it('should delete mentor from a team', async () => {
    await service.createTeam(team1)
    const updatedTeam = await service.deleteMentorFromTeam(team1._id)

    expect(updatedTeam.mentor).toEqual(null)
  })

  it('should fetch teams by courseId', async () => {
    await service.createTeam(team1)
    await service.createTeam(team2)
    const fetchedTeams = await service.getTeamsByCourseId(team1.course)
    expect(fetchedTeams.length).toBe(2)
  })
})
