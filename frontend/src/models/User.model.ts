export enum UserType {
  Candidate,
  Participant,
  Mentor,
  Admin,
}

export type UserTypeName = 'Candidate' | 'Participant' | 'Mentor' | 'Admin'

export enum UserStatus {
  Active,
  Resigned,
  Archived,
}

export type UserStatusName = 'Active' | 'Resigned' | 'Archived'

export interface Grade {
  _id: string
  sectionId?: string
  testPoints?: number
  testMaxPoints?: number
  taskPoints?: number
  taskMaxPoints?: number
  projectPoints?: number
}

export interface UserData {
  _id: string
  name: string
  surname: string
  status: UserStatus
  type: UserType
  grades: Grade[]
  email?: string
}

export interface User {
  id: string
  name: string
  surname: string
  status?: string
  type?: string
  grades?: Grade[]
  averageGrade?: number
  maxGrade?: number
  email?: string
}

export interface IUser {
  name: string
  surname: string
  email: string
  type: UserType
  status: UserStatus
}

export interface IGrade {
  _id: string
  sectionId: string
  testPoints: number
  testMaxPoints: number
  taskPoints: number
  taskMaxPoints: number
  projectPoints: number
}

export const userStatusDict = {
  [UserStatus.Active]: 'Active',
  [UserStatus.Archived]: 'Archived',
  [UserStatus.Resigned]: 'Resigned',
}

export const userTypeDict = {
  [UserType.Candidate]: 'Candidate',
  [UserType.Participant]: 'Participant',
  [UserType.Mentor]: 'Mentor',
  [UserType.Admin]: 'Admin',
}

export const invUserStatusDict = {
  Active: UserStatus.Active,
  Archived: UserStatus.Archived,
  Resigned: UserStatus.Resigned,
}

export const invUserTypeDict = {
  Candidate: UserType.Candidate,
  Participant: UserType.Participant,
  Mentor: UserType.Mentor,
  Admin: UserType.Admin,
}

export interface UserFilters {
  type: UserType[]
  status: UserStatus[]
}

export const convertUserToIUser = (user: User) => {
  return {
    name: user.name,
    surname: user.surname,
    email: user.email ?? '---',
    //@ts-ignore
    type: invUserTypeDict[user.type ?? 'Candidate'] as UserType,
    //@ts-ignore
    status: invUserStatusDict[user.status ?? 'Resigned'] as UserStatus,
  }
}