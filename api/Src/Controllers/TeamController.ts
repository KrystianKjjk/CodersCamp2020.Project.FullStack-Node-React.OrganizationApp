import { Request, Response } from 'express'
import * as mongoose from 'mongoose'
import TeamsService from '../Services/TeamService'

export default class TeamsController {
  service: TeamsService
  constructor(service: TeamsService) {
    this.service = service
  }

  getTeamsList = async (req: Request, res: Response) => {
    const allTeams = await this.service.getTeams()
    res.status(200).json(allTeams)
  }

  getTeamByID = async (req: Request, res: Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const team = await this.service.findTeamById(id)
    if (!team) res.status(404).json({ message: 'Team not found' })
    res.status(200).json(team)
  }

  getTeamsByCourseId = async (req: Request, res: Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const teams = await this.service.getTeamsByCourseId(id)
    res.status(200).json(teams)
  }

  createTeam = async (req: Request, res: Response) => {
    const teamData = req.body
    const newTeam = await this.service.createTeam(teamData)
    res.status(201).json({ ...newTeam, message: 'Team was created' })
  }

  updateTeam = async (req: Request, res: Response) => {
    const teamData = req.body
    const id = new mongoose.Types.ObjectId(req.params.id)
    const team = await this.service.findTeamById(id)
    if (!team) res.status(404).json({ message: 'Team not found' })
    if (teamData === null)
      res.status(400).json({ message: 'Provided data not correct' })
    const updatedTeam = await this.service.updateTeam(id, teamData)
    res.status(200).json(updatedTeam)
  }

  deleteTeam = async (req: Request, res: Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const team = await this.service.findTeamById(id)
    if (!team) res.status(404).json({ message: 'Team not found' })
    await this.service.deleteTeam(id)
    res.status(200).json({ message: 'Team was deleted' })
  }

  addUserToTeam = async (req: Request, res: Response) => {
    const teamId = new mongoose.Types.ObjectId(req.params.id)
    const userId = new mongoose.Types.ObjectId(req.body.userId)
    const team = await this.service.addUserToTeam(teamId, userId)
    if (!team) return res.status(404).json({ message: 'Team not found' })
    res.status(200).json({ message: 'User added to team' })
  }

  addMentorToTeam = async (req: Request, res: Response) => {
    const teamId = new mongoose.Types.ObjectId(req.params.id)
    const mentorId = new mongoose.Types.ObjectId(req.body.mentorId)
    const team = await this.service.addMentorToTeam(teamId, mentorId)
    if (!team) return res.status(404).json({ message: 'Team not found' })
    res.status(200).json({ message: 'Mentor added to team' })
  }

  deleteUserFromTeam = async (req: Request, res: Response) => {
    const teamId = new mongoose.Types.ObjectId(req.params.teamId)
    const userId = new mongoose.Types.ObjectId(req.params.userId)
    const team = await this.service.findTeamById(teamId)
    if (!team) res.status(404).json({ message: 'Team not found' })
    await this.service.deleteUserFromTeam(teamId, userId)
    res.status(200).json({ message: 'User was deleted' })
  }

  deleteMentorFromTeam = async (req: Request, res: Response) => {
    const teamId = new mongoose.Types.ObjectId(req.params.id)
    const team = await this.service.findTeamById(teamId)
    if (!team) res.status(404).json({ message: 'Team not found' })
    await this.service.deleteMentorFromTeam(teamId)
    res.status(200).json({ message: 'Mentor was deleted' })
  }
}
