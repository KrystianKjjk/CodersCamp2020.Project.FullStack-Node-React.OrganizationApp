import api from './api.service'
import { CourseData, TeamData } from '../models'
import {
  userStatusDict,
  userTypeDict,
  User,
  UserData,
  UserFilters,
  IUser,
} from '../models/User.model'
import { calcAvgGrade } from './gradesProcessing'
import { getSection } from './Section.api'
import { getUserFromLocalStorage } from '../app/utils'

const endpoint = '/users'

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

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get(endpoint)
  return response.data.map(transformUserData)
}

export const getUser = async (id: string) => {
  const response = await api.get(`${endpoint}/${id}`)
  const user = response.data as UserData
  console.log({ userID: id })
  return transformUserData(user)
}

export const getUsersOfType = async (type: string): Promise<User[]> => {
  const users = await getUsers()
  return users.filter((user: User) => user.type === type)
}

export const filterUsers = async (filters: UserFilters): Promise<User[]> => {
  const response = await api.get(endpoint, { data: filters })
  const users = response.data.map(transformUserData)
  if (filters.type && filters.type.length > 0) return [users[0]]
  if (filters.status && filters.status.length > 0) return [users[1]]
  return [users[3]]
}

export const getParticipantsNotInTeam = async (): Promise<User[]> => {
  const users = await getUsersOfType('Participant')
  const activeCourse = localStorage.getItem('activeCourse')
  const courseId: string = activeCourse ? JSON.parse(activeCourse)._id : null
  const courseRes = await api.get('/courses/' + (courseId ?? ''))
  const course = courseRes.data as CourseData
  const teams = (await api.get(`/courses/${course._id}/teams`))
    .data as TeamData[]
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

export const getUserMe = async (userID: string) => {
  return api.get(`${endpoint}/me/${userID}`)
}
export const deleteUser = async (userID: string) => {
  return api.delete(`${endpoint}/${userID}`)
}
export const updateUser = async (userID: string, user: IUser) => {
  return api.patch(`${endpoint}/${userID}`, user)
}

export const fetchUserMe = async (): Promise<IUser> => {
  const userDataLS = getUserFromLocalStorage()
  const userID = userDataLS.userId ?? ''
  const response = await getUserMe(userID)
  const userData = response.data

  const gradesExtended = await Promise.all(
    userData.grades.map(async (grade: any) => {
      try {
        if (!grade?.sectionId) throw Error
        const section = await getSection(grade.sectionId)
        return {
          ...grade,
          'Section name': section?.name || '',
        }
      } catch {
        return {
          ...grade,
          'Section name': 'Section does not exist',
        }
      }
    }),
  )

  userData.grades = gradesExtended
  return userData
}

export const fetchUserProfile = async (): Promise<IUser> => {
  const userData = await fetchUserMe()
  return {
    name: userData.name,
    surname: userData.surname,
    type: userData.type,
    status: userData.status,
    email: userData.email,
  }
}
