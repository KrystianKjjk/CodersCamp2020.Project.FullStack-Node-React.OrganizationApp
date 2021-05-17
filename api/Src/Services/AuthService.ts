import { UserModel } from '../Models/User'
import { UserType } from '../Models/User'
import * as mongoose from 'mongoose'
import UserRepository from '../Repositories/UserRepository'
import * as bcrypt from 'bcrypt'
import * as express from 'express'
const jwt = require('jsonwebtoken')

type User = UserModel & mongoose.Document

export default class AuthService {
  private saltRounds: number = 10

  constructor(
    private repository: UserRepository,
    private jwtPrivateKey: string,
    private jwtTokenExpiresIn: string,
    private jwtRefreshPrivateKey: string,
    private jwtRefreshExpiresIn: string,
  ) {}

  generateToken = (user: User): string => {
    return jwt.sign({ _id: user._id, type: user.type }, this.jwtPrivateKey, {
      expiresIn: this.getTokenExp(),
    })
  }

  generateRefreshToken = (user: User): string => {
    return jwt.sign({ _id: user._id }, this.jwtRefreshPrivateKey, {
      expiresIn: this.getRefreshTokenExp(),
    })
  }

  isRefreshTokenValid = (req: express.Request) => {
    const refreshToken: string = req.cookies.refreshToken || ''
    if (!refreshToken) return false

    try {
      return jwt.verify(refreshToken, this.jwtRefreshPrivateKey)
    } catch {
      return false
    }
  }

  getTokenExp = () => parseInt(this.jwtTokenExpiresIn, 10)
  getRefreshTokenExp = () => parseInt(this.jwtRefreshExpiresIn, 10)

  findUser = async (email: string) => {
    return this.repository.getByEmail(email)
  }

  findUserById = async (id: string) => {
    const userId = new mongoose.Types.ObjectId(id)
    return this.repository.getUserInfoById(userId)
  }

  hashPassword = async (user: User) => {
    return await bcrypt.hash(user.password, this.saltRounds)
  }

  checkPassword = async (password: string, user: User) => {
    return await bcrypt.compare(password, user.password)
  }

  saveUser = async (user: User) => {
    return await this.repository.create(user)
  }

  getTokenDataReq = (req: express.Request) => {
    const token = this.getToken(req)
    return token ? this.getTokenData(token) : null
  }

  getToken = (req: express.Request) => {
    return req.cookies.token
  }

  getTokenData = (token: string) => {
    return jwt.decode(token)
  }

  isAdmin = (token: string): boolean => {
    return this.getTokenData(token).type === UserType.Admin
  }

  isMentor = (token: string): boolean => {
    return this.getTokenData(token).type === UserType.Mentor
  }

  isParticipant = (token: string): boolean => {
    return this.getTokenData(token).type === UserType.Participant
  }

  isCandidate = (token: string): boolean => {
    return this.getTokenData(token).type === UserType.Candidate
  }

  isUserWithID = (token: string, _id: mongoose.Types.ObjectId): boolean => {
    return this.getTokenData(token)._id === _id
  }

  isUserMentor = (token: string, _id: mongoose.Types.ObjectId): boolean => {
    return this.isUserWithID(token, _id) && this.isMentor(token)
  }
}
