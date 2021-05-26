import * as mongoose from 'mongoose'
import ProjectRepository from '../Src/Repositories/ProjectRepository'
import ProjectService from '../Src/Services/ProjectService'
import ProjectSchema from '../Src/Models/Project'
import { Project } from '../Src/Models/Project'

type ProjectDBModel = Project & { _id: mongoose.Types.ObjectId }

class TestProjectRepository extends ProjectRepository {
  private projects: Array<ProjectDBModel> = []
  model: any

  async getAll() {
    return this.projects
  }
  async getAllByCourse(courseId: string) {
    return this.projects
  }

  async getById(id: mongoose.Types.ObjectId) {
    return this.projects.find((project) => project._id === id)
  }

  async create(project: ProjectDBModel) {
    this.projects = [...this.projects, project]
  }

  async deleteById(id: mongoose.Types.ObjectId) {
    this.projects = this.projects.filter((project) => project._id !== id)
  }

  async updateById(id: mongoose.Types.ObjectId, project: ProjectDBModel) {
    const projectIndex = this.projects.findIndex(
      (project) => project._id === id,
    )
    const projectAfterUpdate = { ...this.projects[projectIndex], ...project }
    this.projects[projectIndex] = projectAfterUpdate

    return projectAfterUpdate
  }
}

describe('Project Service', () => {
  let service: ProjectService
  const exampleCourseId = '1234567890aa'
  beforeEach(() => {
    service = new ProjectService(new TestProjectRepository(ProjectSchema))
  })

  it('persists project model', async () => {
    const project = {
      _id: mongoose.Types.ObjectId(),
      sectionId: mongoose.Types.ObjectId(),
      projectName: 'Projekt 1',
      projectUrl: 'projekt url 1',
      description: 'description',
    }

    await service.createProject(project)
    const fetchedProject = await service.findProjectById(project._id)
    expect(fetchedProject).toEqual(project)
  })

  it('can list out all projects', async () => {
    const firstProject = {
      _id: mongoose.Types.ObjectId(),
      sectionId: mongoose.Types.ObjectId(),
      projectName: 'Projekt 1',
      projectUrl: 'projekt url 1',
      description: 'description',
    }

    const secondProject = {
      _id: mongoose.Types.ObjectId(),
      sectionId: mongoose.Types.ObjectId(),
      projectName: 'Projekt 2',
      projectUrl: 'projekt url 2',
      description: 'description',
    }

    await service.createProject(firstProject)
    await service.createProject(secondProject)

    const allProjects = await service.getProjects(exampleCourseId)
    expect(allProjects).toHaveLength(2)
  })

  it('should delete a project', async () => {
    const project = {
      _id: mongoose.Types.ObjectId(),
      sectionId: mongoose.Types.ObjectId(),
      projectName: 'Projekt 1',
      projectUrl: 'projekt url 1',
    }

    await service.createProject(project)
    await service.deleteProjectById(project._id)

    const allProjects = await service.getProjects(exampleCourseId)
    expect(allProjects).toHaveLength(0)
  })

  it('should update a project', async () => {
    const project = {
      _id: mongoose.Types.ObjectId(),
      sectionId: mongoose.Types.ObjectId(),
      projectName: 'Projekt 3',
      projectUrl: 'projekt url 3',
    }

    await service.createProject(project)
    const updatedProject = await service.updateProjectById(project._id, {
      projectName: 'Nowa nazwa projektu 3',
    })

    expect(updatedProject.projectName).toEqual('Nowa nazwa projektu 3') // changed
    expect(updatedProject.projectUrl).toEqual('projekt url 3') // stayed the same
  })

  it('validates by using custom method', async () => {
    const allDataNeededToCreate = {
      sectionId: mongoose.Types.ObjectId(),
      projectName: 'Projekt 3',
      projectUrl: 'projekt url 3',
    }

    const someDataNeededToUpdate = {
      projectName: 'Projekt 3',
    }

    const allDataButWrongTypes = {
      sectionId: 3, // wrong type
      projectName: '',
      projectUrl: ['aaa.pl'], // wrong type
    }

    expect(
      service.validateProjectData(allDataNeededToCreate, true),
    ).not.toBeNull()
    expect(
      service.validateProjectData(allDataNeededToCreate, false),
    ).not.toBeNull()

    expect(service.validateProjectData(someDataNeededToUpdate, true)).toBeNull()
    expect(
      service.validateProjectData(someDataNeededToUpdate, false),
    ).not.toBeNull()

    expect(
      service.validateProjectData(allDataButWrongTypes as any, true),
    ).toBeNull()
    expect(
      service.validateProjectData(allDataButWrongTypes as any, false),
    ).toBeNull()
  })
})
