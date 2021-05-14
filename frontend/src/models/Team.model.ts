import { User, TeamProject } from './'
import { UserData } from './User.model'

export interface TeamData {
  _id: string
  mentor: {
    _id: string
    name: string
    surname: string
  } | null
  users: UserData[]
  course: {
    name: string
  }
}

export interface Team {
  id: string
  name: string
  surname: string
  courseName: string
  users?: UserData[]
}

export interface TeamInfo {
  id: string
  mentor: {
    id: string
    name: string
    surname: string
  }
  users: User[]
  projects: TeamProject[]
  teamAvgGrade: number
  maxPoints: number
}
