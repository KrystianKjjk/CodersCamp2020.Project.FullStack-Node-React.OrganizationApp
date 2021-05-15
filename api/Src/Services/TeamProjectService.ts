import * as mongoose from 'mongoose'
import { TeamProject } from '../Models/TeamProject'
import TeamProjectRepository from '../Repositories/TeamProjectRepository'
import TeamRepository from '../Repositories/TeamRepository'
import * as _ from 'lodash'
import { TeamProjectDto } from '../Models/DTO/TeamProjectDto'

export default class TeamProjectService {
  constructor(
    private teamProjectRepository: TeamProjectRepository,
    private teamRepository: TeamRepository,
  ) {}

  getTeamProjectsByTeamId = async (
    teamId: mongoose.Types.ObjectId,
  ): Promise<(TeamProject & mongoose.Document<TeamProject>)[]> => {
    return this.teamProjectRepository.findByTeamId(teamId)
  }

  getTeamProjectsByMentorId = async (
    mentorId: mongoose.Types.ObjectId,
  ): Promise<(TeamProject & mongoose.Document<TeamProject>)[]> => {
    const team = await this.teamRepository.getByMentorId(mentorId)
    if (!team) return null
    return this.getTeamProjectsByTeamId(team._id)
  }

  //fajnie by było przeprowadzic te filtracje jeszcze ana bazie ... ale jak ?
  getTeamProjects = async (courseId: string): Promise<TeamProjectDto[]> => {
    const data = await this.teamProjectRepository.getAll()
    const dataForCourse = data.filter(
      (d) => d.parentProjectId?.sectionId?.course.toString() === courseId,
    )
    const teamProjects = dataForCourse.map<TeamProjectDto>((r) => ({
      id: r._id,
      teamProjectName: r.projectName,
      mentorName: r.teamId?.mentor
        ? `${r.teamId?.mentor?.name} ${r.teamId?.mentor?.surname}`
        : undefined,
      mentorId: r.teamId?.mentor._id,
      referenceProjectId: r.parentProjectId?._id,
      referenceProjectName: r.parentProjectId?.projectName,
      sectionId: r.parentProjectId?.sectionId?._id,
      sectionName: r.parentProjectId?.sectionId?.name,
    }))

    return teamProjects
  }

  getTeamProjectById = async (teamProjectId: mongoose.Types.ObjectId) => {
    return this.teamProjectRepository.getById(teamProjectId)
  }

  createTeamProject = async (
    teamProject: TeamProject & mongoose.Document<TeamProject>,
  ) => {
    return this.teamProjectRepository.create(teamProject)
  }

  createTeamProjectForMentor = async (
    mentorId: mongoose.Types.ObjectId,
    teamProject: TeamProject & mongoose.Document<TeamProject>,
  ) => {
    const team = await this.teamRepository.getByMentorId(mentorId)
    if (!team) return null
    teamProject.teamId = team._id
    await teamProject.validate()
    await this.createTeamProject(teamProject)
    return teamProject
  }

  updateTeamProject = async (
    id: mongoose.Types.ObjectId,
    teamProject: TeamProject & mongoose.Document<TeamProject>,
  ) => {
    return this.teamProjectRepository.updateById(id, teamProject)
  }

  updateTeamProjectByMentorId = async (
    id: mongoose.Types.ObjectId,
    mentorId: mongoose.Types.ObjectId,
    teamProject: TeamProject & mongoose.Document<TeamProject>,
  ) => {
    const team = await this.teamRepository.getByMentorId(mentorId)
    if (!team) return null
    teamProject.teamId = team._id
    await teamProject.validate()
    const updateQuery = _.omit(teamProject['_doc'], '_id') as object
    return this.teamProjectRepository.updateForTeam(id, team._id, updateQuery)
  }

  deleteTeamProject = async (teamProjectId: mongoose.Types.ObjectId) => {
    return this.teamProjectRepository.deleteById(teamProjectId)
  }

  deleteTeamProjectByIdForMentor = async (
    id: mongoose.Types.ObjectId,
    mentorId: mongoose.Types.ObjectId,
  ) => {
    const team = await this.teamRepository.getByMentorId(mentorId)
    if (!team) return null
    return this.teamProjectRepository.deleteByIdForTeam(id, team._id)
  }
}
