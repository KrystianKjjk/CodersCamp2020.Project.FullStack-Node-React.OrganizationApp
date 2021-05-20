import * as express from 'express'
import * as mongoose from 'mongoose'
import { Project } from '../Models/Project'
import ProjectService from '../Services/ProjectService'

export default class ProjectController {
  service: ProjectService
  constructor(service: ProjectService) {
    this.service = service
  }

  getAllProjects = async (req: express.Request, res: express.Response) => {
    const courseId: string = req.query.courseId as string

    const allProjects = await this.service.getProjects(courseId)
    res.status(200).json(allProjects)
  }

  getProject = async (req: express.Request, res: express.Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const project = await this.service.findProjectById(id)
    if (!project) res.status(404).json({ message: 'Project not found' })
    res.status(200).json(project)
  }

  createProject = async (req: express.Request, res: express.Response) => {
    const projectData = req.body
    const validatedProjectData = this.service.validateProjectData(
      projectData,
      true,
    ) as null | Omit<Project, '_id'>
    if (validatedProjectData === null)
      res
        .status(400)
        .json({ message: 'Provided data not correct or incomplete' })
    const newProject = await this.service.createProject(validatedProjectData)
    res.status(201).json(newProject)
  }

  updateProject = async (req: express.Request, res: express.Response) => {
    const projectData = req.body
    const id = new mongoose.Types.ObjectId(req.params.id)
    const validatedProjectData = this.service.validateProjectData(
      projectData,
      false,
    ) as null | Partial<Omit<Project, '_id'>>

    const project = await this.service.findProjectById(id)
    if (!project) res.status(404).json({ message: 'Project not found' })

    if (validatedProjectData === null)
      res.status(400).json({ message: 'Provided data not correct' })

    const updatedProject = await this.service.updateProjectById(
      id,
      validatedProjectData,
    )
    res.status(200).json(updatedProject)
  }

  deleteProject = async (req: express.Request, res: express.Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const project = await this.service.findProjectById(id)
    if (!project) res.status(404).json({ message: 'Project not found' })
    await this.service.deleteProjectById(id)
    res.status(200).json({ message: 'Project was deleted' })
  }
}
