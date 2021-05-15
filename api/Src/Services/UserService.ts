import UserRepository from '../Repositories/UserRepository'
import { UserModel as User, UserStatus, UserType } from '../Models/User'
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import { GradeType } from '../Models/Grade'
import { Team } from '../Models/Team'

export default class UserService {
  repository: UserRepository
  rounds: number = 10
  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async logIn(
    email: string,
    password: string,
  ): Promise<(mongoose.Document<User> & User) | null> {
    const user = await this.repository.getByEmail(email)
    if (!user) return null
    const same = await bcrypt.compare(password, user.password)
    if (!same) return null
    return user
  }

  async getByTypeAndStatus(reqBody: any) {
    let type: UserType[], status: UserStatus[]
    const typeError = {
      name: 'ValidationError',
      message: 'User type and status should be arrays of enums',
    }
    type = reqBody.type ?? []
    status = reqBody.status ?? []
    if (!(type instanceof Array) || !(status instanceof Array)) throw typeError

    return this.repository.getByTypeAndStatus(type, status)
  }

  async findUserById(id: mongoose.Types.ObjectId) {
    return this.repository.getById(id)
  }

  async deleteGradeById(id: mongoose.Types.ObjectId) {
    return this.repository.deleteGradeById(id)
  }

  async updateGradeById(id: mongoose.Types.ObjectId, grade: GradeType) {
    return this.repository.updateGradeById(id, grade)
  }

  async getUserInfoById(id: mongoose.Types.ObjectId) {
    return this.repository.getUserInfoById(id)
  }

  async getUsers(): Promise<(User & mongoose.Document<User>)[]> {
    return this.repository.getAll()
  }

  async createUser(user: User) {
    user.password = await bcrypt.hash(user.password, this.rounds)
    return this.repository.create(user)
  }

  async updateUser(
    id: mongoose.Types.ObjectId,
    props: {
      [prop: string]: any
      password?: string
    },
  ) {
    if (props.password) {
      const password = await bcrypt.hash(props.password, this.rounds)
      props.password = password
    }
    return this.repository.updateById(id, props)
  }

  async deleteUser(id: mongoose.Types.ObjectId) {
    return this.repository.deleteById(id)
  }

  async getUserByGradeId(gradeId: mongoose.Types.ObjectId) {
    return this.repository.getByGradeId(gradeId)
  }

  async getUsersByCourseId(courseId: mongoose.Types.ObjectId) {
    return this.repository.getUsersByCourseId(courseId)
  }

  getUsersFromTeams(teams: Array<Team>): Array<User> {
    let usersFromTeams = []
    teams.forEach((team) => {
      usersFromTeams.push(...team.users)
    })
    return usersFromTeams
  }

  getUsersWithoutTeams(teams: Array<Team>, users: Array<User>) {
    const usersFromTeams = this.getUsersFromTeams(teams)

    return users.filter(
      (user) =>
        !usersFromTeams.find((userFromTeam) => userFromTeam._id === user._id),
    )
  }
}
