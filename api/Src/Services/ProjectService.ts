import * as mongoose from 'mongoose'
import { Project } from '../Models/Project'
import ProjectRepository from '../Repositories/ProjectRepository'
import projectRoutes from '../Routes/ProjectRoutes'

// export type MongoModel = mongoose.Model<mongoose.Document>;

class ProjectService {
  projectRepository: ProjectRepository
  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository
  }

  async getProjects() {
    return this.projectRepository.getAll()
  }

  async findProjectById(id: mongoose.Types.ObjectId) {
    return this.projectRepository.getById(id)
  }

  async createProject(validatedProjectData: Omit<Project, '_id'>) {
    return this.projectRepository.create(validatedProjectData)
  }

  async updateProjectById(
    id: mongoose.Types.ObjectId,
    validatedProjectData: Partial<Omit<Project, '_id'>>,
  ) {
    return this.projectRepository.updateById(id, validatedProjectData)
  }

  async deleteProjectById(id: mongoose.Types.ObjectId) {
    return this.projectRepository.deleteById(id)
  }

  validateProjectData(
    projectData: Partial<Omit<Project, '_id'>>,
    checkForAll: boolean,
  ) {
    if (checkForAll) {
      if (
        !projectData.sectionId ||
        !projectData.projectName ||
        !projectData.projectUrl
      ) {
        return null
      }
    }

    if (
      projectData.projectName &&
      typeof projectData.projectName !== 'string'
    ) {
      return null
    }

    if (projectData.projectUrl && typeof projectData.projectUrl !== 'string') {
      return null
    }

    if (
      projectData.description &&
      typeof projectData.description !== 'string'
    ) {
      return null
    }

    return projectData
  }
}

export default ProjectService
