import { TeamService } from '.'
import BaseService from '../app/baseService'
import {
  userStatusDict,
  userTypeDict,
  User,
  UserData,
  UserFilters,
} from '../models/User.model'
import { calcAvgGrade } from './gradesProcessing'

function transformUserData(data: UserData): User {
  return {
    ...data,
    id: data._id,
    type: userTypeDict[data.type],
    status: userStatusDict[data.status],
    averageGrade: data.grades.length
      ? data.grades.map(calcAvgGrade).reduce((a, b) => a + b, 0) /
        data.grades.length
      : 0,
  }
}

export default class UserService {
  constructor(
    private api = new BaseService(),
    private teamsApi = new TeamService(),
  ) {}

  getUsers = async (): Promise<User[]> => {
    const response = await this.api.get('/users')
    return response.data.map(transformUserData)
  }

  getUser = async (id: string) => {
    const response = await this.api.get('/users/' + id)
    const user = response.data as UserData
    return transformUserData(user)
  }

  getUsersOfType = async (type: string): Promise<User[]> => {
    const users = await this.getUsers()
    return users.filter((user: User) => user.type === type)
  }

  filterUsers = async (filters: UserFilters): Promise<User[]> => {
    const response = await this.api.get('/users/', { data: filters })
    const users = response.data.map(transformUserData)
    if (filters.type && filters.type.length > 0) return [users[0]]
    if (filters.status && filters.status.length > 0) return [users[1]]
    return [users[3]]
  }

  getParticipantsNotInTeam = async (): Promise<User[]> => {
    const users = await this.getUsersOfType('Participant')
    const teams = await this.teamsApi.getTeams()
    const result = users.filter((user) => {
      return teams.every(
        (team) =>
          !team.users ||
          team.users.every((u) => {
            if (u._id !== user.id) console.log('asd')
            return u._id !== user.id
          }),
      )
    })
    return result
  }
}
