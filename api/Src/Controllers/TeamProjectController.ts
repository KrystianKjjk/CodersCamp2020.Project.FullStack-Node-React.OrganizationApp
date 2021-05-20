import * as express from 'express'
import TeamProjectService from '../Services/TeamProjectService'
import * as mongoose from 'mongoose'
import TeamProjectSchema from '../Models/TeamProject'

export default class TeamProjectController {
  private service: TeamProjectService

  constructor(service: TeamProjectService) {
    this.service = service
  }

  getTeamProjects = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const courseId: string = req.query.courseId as string
    const teamProjects = await this.service.getTeamProjects(courseId)
    return res.status(200).json(teamProjects)
  }

  getTeamProjectsByTeamId = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const teamProjects = await this.service.getTeamProjectsByTeamId(id)
    if (!teamProjects)
      return res.status(404).json({ message: 'Team not found' })
    return res.status(200).json(teamProjects)
  }

  getTeamProjectsByMentorId = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const id = new mongoose.Types.ObjectId(req.params.mentorId)
    const teamProjects = await this.service.getTeamProjectsByMentorId(id)
    if (!teamProjects)
      return res.status(404).json({ message: 'Team not found' })
    return res.status(200).json(teamProjects)
  }

  getTeamProjectById = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id)
      const teamProject = await this.service.getTeamProjectById(id)
      if (!teamProject) {
        return res.status(404).json({ message: 'Team project not found' })
      }
      return res.status(200).json(teamProject)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createTeamProject = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const teamProject = new TeamProjectSchema(req.body)
      await teamProject.validate()
      await this.service.createTeamProject(teamProject)
      return res.status(201).json(teamProject)
    } catch (error) {
      const errorMessage = { message: error.message }
      if (error.name === 'ValidationError') {
        return res.status(400).json(errorMessage)
      }
      return res.status(500).json(errorMessage)
    }
  }

  createTeamProjectForMentor = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const teamProject = new TeamProjectSchema(req.body)
      const mentorId = new mongoose.Types.ObjectId(req.params.id)
      const result = await this.service.createTeamProjectForMentor(
        mentorId,
        teamProject,
      )
      if (!result) return res.status(404).json({ message: 'Team not found' })
      return res.status(201).json(teamProject)
    } catch (error) {
      const errorMessage = { message: error.message }
      if (error.name === 'ValidationError') {
        return res.status(400).json(errorMessage)
      }
      return res.status(500).json(errorMessage)
    }
  }

  updateTeamProject = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id)
      const teamProject = new TeamProjectSchema(req.body)
      teamProject._id = id
      await teamProject.validate()
      const updatedTeamProject = await this.service.updateTeamProject(
        id,
        teamProject,
      )
      if (!updatedTeamProject) {
        return res.status(404).json({ message: 'Team project not found' })
      }

      const fetchedTeamProject = await this.service.getTeamProjectById(id)
      return res.status(201).json(fetchedTeamProject)
    } catch (error) {
      const errorMessage = { message: error.message }
      if (error.name === 'ValidationError') {
        res.statusMessage = 'Validation error'
        return res.status(400).json(errorMessage)
      }

      return res.status(500).json(errorMessage)
    }
  }

  updateTeamProjectForMentor = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id)
      const mentorId = new mongoose.Types.ObjectId(req.params.mentorId)
      const teamProject = new TeamProjectSchema(req.body)
      const updatedTeamProject = await this.service.updateTeamProjectByMentorId(
        id,
        mentorId,
        teamProject,
      )
      if (!updatedTeamProject) {
        return res.status(404).json({ message: 'Team project not found' })
      }
      const fetchedTeamProject = await this.service.getTeamProjectById(id)
      return res.status(201).json(fetchedTeamProject)
    } catch (error) {
      const errorMessage = { message: error.message }
      if (error.name === 'ValidationError') {
        return res.status(400).json(errorMessage)
      }
      return res.status(500).json(errorMessage)
    }
  }

  deleteTeamProject = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id)
      const teamProject = await this.service.deleteTeamProject(id)

      if (!teamProject) {
        res.statusMessage = 'Team project not found'
        return res.status(404).json({ message: 'Team project not found' })
      }
      return res.status(200).end()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteTeamProjectForMentor = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id)
      const mentorId = new mongoose.Types.ObjectId(req.params.mentorId)
      const teamProject = await this.service.deleteTeamProjectByIdForMentor(
        id,
        mentorId,
      )
      if (!teamProject) {
        return res.status(404).json({ message: 'Team project not found' })
      }
      return res.status(200).end()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
