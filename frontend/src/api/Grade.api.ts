import { IGrade } from '../models/User.model'
import api from './api.service'

const endpoint: string = 'grades'

export const getGrades = async (userID: string) => {
  return api.get(`${endpoint}/${userID}`)
}
export const createGrade = async (userID: string, grade: IGrade) => {
  return api.post(`${endpoint}/${userID}`, grade)
}
export const updateGrade = async (gradeID: string, grade: IGrade) => {
  return api.patch(`${endpoint}/${gradeID}`, grade)
}
export const deleteGrade = async (gradeID: string) => {
  return api.delete(`${endpoint}/${gradeID}`)
}
