import UserModel from '../Models/User'
import UserService from '../Services/UserService'
import { Request, Response } from 'express'
import * as mongoose from 'mongoose'
import TeamsService from '../Services/TeamService'

interface MailingService {
  sendMail: Function
}

export default class UserController {
  userService: UserService
  mailingService: MailingService
  teamService: TeamsService
  constructor(
    userService: UserService,
    mailingService: MailingService,
    teamService: TeamsService,
  ) {
    this.userService = userService
    this.mailingService = mailingService
    this.teamService = teamService
  }

  getUser = async (req: Request, res: Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const user = await this.userService.findUserById(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  }

  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers()
    res.status(200).json(users)
  }

  getByTypeAndStatus = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getByTypeAndStatus(req.body)
      return res.status(200).json(users)
    } catch (err) {
      if (err.name === 'ValidationError')
        return res.status(400).json({ message: err.message })
      res.status(500).json({ message: err.message })
    }
  }

  updateUser = async (req: Request, res: Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const user = await this.userService.updateUser(id, req.body)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User updated' })
  }

  deleteUser = async (req: Request, res: Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const user = await this.userService.deleteUser(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User deleted' })
  }

  register = async (req: Request, res: Response) => {
    try {
      const user = new UserModel(req.body)
      await user.validate()
      await this.userService.createUser(user)
      res.status(201).json({ message: 'Register succeed' })

      //Mailing the user
      this.mailingService.sendMail({
        from: 'coderscamp@fastmail.com',
        to: user.email,
        subject: 'Welcome to CodersCamp',
        template: 'welcomeEmail',
        context: {
          userName: user.name,
          email: user.email,
          appLink: process.env.PAGE_URL || 'https://coderscamp.edu.pl/',
        },
      })
    } catch (err) {
      if (err.name === 'ValidationError')
        return res.status(400).json({ message: err.message })
      res.status(500).json({ message: err.message })
    }
  }

  getUserInfoById = async (req: Request, res: Response) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const user = await this.userService.getUserInfoById(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  }

  getUsersByCourseId = async (req: Request, res: Response) => {
    const courseId = new mongoose.Types.ObjectId(req.params.courseId)
    const allTeams = await this.teamService.getTeams()
    const allUsers = await this.userService.getUsers()

    const teams = await this.teamService.getTeamsByCourseId(courseId)
    const users = this.userService.getUsersFromTeams(teams)
    const usersWithoutTeams = this.userService.getUsersWithoutTeams(
      allTeams,
      allUsers,
    )
    // const usersByCourse = await this.userService.getUsersByCourseId(courseId);
    if (!users) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ users, usersWithoutTeams })
  }
}
