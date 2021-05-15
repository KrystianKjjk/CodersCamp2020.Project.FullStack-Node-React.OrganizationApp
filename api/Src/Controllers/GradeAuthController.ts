import * as express from 'express'
import * as mongoose from 'mongoose'

import { UserType } from '../Models/User'
import TeamService from '../Services/TeamService'
import AuthService from '../Services/AuthService'
import { Team } from '../Models/Team'
import UserService from '../Services/UserService'

type ITeam = Team & mongoose.Document

export default class AuthGradeController {
  constructor(
    private teamService: TeamService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  getPostUserGrades = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const tokenObj = this.authService.getTokenDataReq(req)
    const { _id: _id, type: userRole } = tokenObj

    if (userRole === UserType.Mentor) {
      const userID = new mongoose.Types.ObjectId(req.params.userID)
      const mentorID = new mongoose.Types.ObjectId(_id)
      const theSameTeam = await this.teamService.checkUserByMentorId(
        mentorID,
        userID,
      )

      return theSameTeam?.length
        ? next()
        : res.status(403).json({ message: 'FORBIDDEN' })
    } else next()
  }

  patchDeleteUserGrades = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const tokenObj = this.authService.getTokenDataReq(req)
    const { _id: _id, type: userRole } = tokenObj

    if (userRole === UserType.Mentor) {
      const mentorID = new mongoose.Types.ObjectId(_id)
      const team: ITeam = await this.teamService.getTeamByMentorId(mentorID)
      const gradeID = new mongoose.Types.ObjectId(req.params.id)
      const user = await this.userService.getUserByGradeId(gradeID)

      return team.users.includes(user?._id)
        ? next()
        : res.status(403).json({ message: 'FORBIDDEN' })
    } else next()
  }
}
