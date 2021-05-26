import * as mongoose from 'mongoose'
import { Project } from '../Models/Project'
import ProjectRepository from '../Repositories/ProjectRepository'
import { ProjectDto } from '../Models/DTO/ProjectDto'
class ProjectService {
  projectRepository: ProjectRepository
  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository
  }

  async getProjects(courseId: string) {
    const projects = this.projectRepository.getAllByCourse(courseId)

    return (await projects).map<ProjectDto>((p) => ({
      id: p._id,
      projectName: p.projectName,
      sectionName: p.section && p.section[0].name,
      sectionId: p.section && p.section[0]._id,
      startDate: p.section && p.section[0].startDate,
      endDate: p.section && p.section[0].endDate,
    }))
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
