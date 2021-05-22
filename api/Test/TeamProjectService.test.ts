import * as mongoose from 'mongoose'
import { TeamProject } from '../Src/Models/TeamProject'
import TeamProjectSchema from '../Src/Models/TeamProject'
import TeamProjectRepository from '../Src/Repositories/TeamProjectRepository'
import TeamProjectService from '../Src/Services/TeamProjectService'
import { TestTeamsRepository } from './TeamService.test'

class TestTeamProjectRepository extends TeamProjectRepository {
  private projects: TeamProject[] = []

  constructor() {
    super(TeamProjectSchema)
  }

  async getAll() {
    return this.projects
  }
  async getAllByCourse(courseId: String) {
    return [
      {
        _id: '6042af0f06ad6350dcdaee27',
        projectName: 'testfullproject123',
        mentor: [
          {
            _id: '6076dbb9aa05930015915eb2',
            name: 'Karolina',
            surname: 'Lewandowska',
          },
        ],
        parentProject: [
          {
            _id: '60774edb7cb92200156f43e2',
            projectName: 'Portfolio',
          },
        ],
        section: [
          {
            _id: '6076dae6aa05930015915ead',
            name: 'HTML',
          },
        ],
      },
      {
        _id: '6077036792cea60015263736',
        projectName: 'Animal Shelter Backend App',
        mentor: [
          {
            _id: '6076dbb9aa05930015915eb2',
            name: 'Karolina',
            surname: 'Lewandowska',
          },
        ],
        parentProject: [
          {
            _id: '60774edb7cb92200156f43e2',
            projectName: 'Portfolio',
          },
        ],
        section: [
          {
            _id: '6076dae6aa05930015915ead',
            name: 'HTML',
          },
        ],
      },
      {
        _id: '607703af92cea6001526373d',
        projectName: 'Funny Project for Counting Ducks',
        mentor: [],
        parentProject: [
          {
            _id: '6077044d92cea60015263742',
            projectName: 'Cinema Backend',
          },
        ],
        section: [
          {
            _id: '6076ff2a92cea60015263721',
            name: 'Node.JS',
          },
        ],
      },
    ]
  }
  async getById(id: mongoose.Types.ObjectId) {
    return this.projects.find((project) => project._id === id)
  }

  async create(project: TeamProject & mongoose.Document<TeamProject>) {
    this.projects.push(project)
  }

  async deleteById(id: mongoose.Types.ObjectId) {
    const projectIndex = this.projects.findIndex(
      (project) => project._id === id,
    )
    if (projectIndex > -1) {
      this.projects.splice(projectIndex, 1)
    }
  }

  async deleteByIdForTeam(
    id: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId,
  ) {
    const projectIndex = this.projects.findIndex(
      (project) => project._id === id && project.teamId === teamId,
    )
    if (projectIndex > -1) {
      return this.projects.splice(projectIndex, 1)
    }
    return null
  }

  async updateById(
    id: mongoose.Types.ObjectId,
    project: TeamProject & mongoose.Document<TeamProject>,
  ) {
    const projectIndex = this.projects.findIndex(
      (project) => project._id === id,
    )
    this.projects[projectIndex] = project
    return project
  }

  async findByTeamId(teamId: mongoose.Types.ObjectId) {
    const teamProjects = this.projects.filter((project) =>
      teamId.equals(project.teamId),
    )
    return teamProjects
  }
}

describe('TeamProjectService', () => {
  let service: TeamProjectService
  let teamId = mongoose.Types.ObjectId()
  let mentorId = mongoose.Types.ObjectId()
  beforeEach(() => {
    const team1 = {
      _id: teamId,
      mentor: mentorId,
      users: [mongoose.Types.ObjectId()],
      course: mongoose.Types.ObjectId(),
    }
    const teamProjectRepository = new TestTeamProjectRepository()
    const teamRepository = new TestTeamsRepository()
    teamRepository.create(team1)
    service = new TeamProjectService(teamProjectRepository, teamRepository)
  })

  test('should create team project and fetch it', async () => {
    const teamProject = new TeamProjectSchema({
      teamId: '1',
      parentProjectId: '2',
      projectName: 'FitNotFat',
      projectUrl: 'fitnotfat.url',
      description: 'description',
    })

    await service.createTeamProject(teamProject)
    const fetchedTeamProject = await service.getTeamProjectById(teamProject._id)
    expect(fetchedTeamProject).toEqual(teamProject)
  })

  test('should fetch all team projects', async () => {
    const teamProject1 = new TeamProjectSchema({
      teamId: teamId,
      parentProjectIds: new mongoose.Types.ObjectId(),
      projectName: 'FitNotFat',
      projectUrl: 'fitnotfat.url',
      description: 'description',
    })
    const teamProject2 = new TeamProjectSchema({
      teamId: '2',
      parentProjectId: '4',
      projectName: 'Pokemons',
      projectUrl: 'pokemons.url',
      description: 'description',
    })

    await service.createTeamProjectForMentor(mentorId, teamProject1)
    await service.createTeamProject(teamProject2)

    const fetchedTeamProjects = await service.getTeamProjectsByMentorId(
      mentorId,
    )
    expect(fetchedTeamProjects.length).toBe(1)
  })

  test('should delete teamProject', async () => {
    const teamProject = new TeamProjectSchema({
      teamId: teamId,
      parentProjectIds: new mongoose.Types.ObjectId(),
      projectName: 'FitNotFat',
      projectUrl: 'fitnotfat.url',
      description: 'description',
    })

    await service.createTeamProject(teamProject)
    await service.deleteTeamProjectByIdForMentor(teamProject._id, mentorId)

    const fetchedTeamProjects = await service.getTeamProjects('1234567890aa')
    expect(fetchedTeamProjects.length).toBe(3)
  })

  test('should update teamProject', async () => {
    const teamProject = new TeamProjectSchema({
      teamId: '1',
      parentProjectId: '2',
      projectName: 'FitNotFat',
      projectUrl: 'fitnotfat.url',
      description: 'description',
    })
    await service.createTeamProject(teamProject)
    teamProject.projectName = 'updated project name'
    const updatedTeamProject = await service.updateTeamProject(
      teamProject._id,
      teamProject,
    )

    expect(updatedTeamProject.projectName).toBe(teamProject.projectName)
  })

  test('should fetch all team projects by teamId', async () => {
    const teamProject1 = new TeamProjectSchema({
      teamId: '6041184b4864b56a243b20bf',
      parentProjectId: '2',
      projectName: 'FitNotFat',
      projectUrl: 'fitnotfat.url',
      description: 'description',
    })
    const teamProject2 = new TeamProjectSchema({
      teamId: '6041184b4864b56a243b20bf',
      parentProjectId: '4',
      projectName: 'Pokemons',
      projectUrl: 'pokemons.url',
      description: 'description',
    })
    const teamProject3 = new TeamProjectSchema({
      teamId: '1041184b4864b56a243b20bf',
      parentProjectId: '3',
      projectName: 'Chess',
      projectUrl: 'chess.url',
      description: 'description',
    })

    await service.createTeamProject(teamProject1)
    await service.createTeamProject(teamProject2)
    await service.createTeamProject(teamProject3)
    const id = new mongoose.Types.ObjectId('6041184b4864b56a243b20bf')
    const fetchedTeamProjects = await service.getTeamProjectsByTeamId(id)
    expect(fetchedTeamProjects.length).toBe(2)
  })
})
