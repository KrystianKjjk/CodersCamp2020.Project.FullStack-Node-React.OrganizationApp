import * as mongoose from 'mongoose'
import { TeamProject } from '../Models/TeamProject'
import TeamProjectRepository from '../Repositories/TeamProjectRepository'
import TeamRepository from '../Repositories/TeamRepository'
import * as _ from 'lodash'
import { Team } from '../Models/Team'
import UserRepository from '../Repositories/UserRepository'
import { UserType, UserModel } from '../Models/User'
import ProjectRepository from '../Repositories/ProjectRepository'
import { Project } from '../Models/Project'
import SectionRepository from '../Repositories/SectionRepository'
import { Section } from '../Models/Section'
import { TeamProjectDto } from '../Models/DTO/TeamProjectDto'

export default class TeamProjectService {
  constructor(
    private teamProjectRepository: TeamProjectRepository,
    private teamRepository: TeamRepository,
    private userRepository: UserRepository,
    private referenceProjectRepository: ProjectRepository,
    private sectionRepository: SectionRepository,
  ) { }

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

  getTeamProjects = async (): Promise<TeamProjectDto[]> => {
    const result: TeamProjectDto[] = []

    const teamProjects: TeamProject[] = await this.teamProjectRepository.getAll()
    teamProjects.forEach(async (t) => {
      const team = await this.teamRepository.getById(t.teamId)
      const mentor: UserModel = await this.userRepository.getById(team.mentor)

      const parentProject: Project = await this.referenceProjectRepository.getById(
        t.parentProjectId,
      )
      const section: Section = await this.sectionRepository.getById(
        parentProject.sectionId,
      )
      const res: TeamProjectDto = {
        id: t._id.toHexString(),
        teamProjectName: t.projectName,
        mentor: {
          id: mentor._id.toHexString(),
          name: `${mentor.name} ${mentor.surname}`,
        },
        referenceProject: {
          id: t.parentProjectId.toHexString(),
          projectName: parentProject.projectName,
        },
        section: {
          id: parentProject.sectionId.toHexString(),
          sectionName: section.name,
        },
      }
      result.push(res)
    })
    console.log(result)
    // const res = teamProjectInfo
    return result
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
