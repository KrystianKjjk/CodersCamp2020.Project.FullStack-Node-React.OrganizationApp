import { IGrade } from '../models/User.model'
import api from './api.service'
import * as sectionService from './Section.api'

const endpoint: string = 'grades'

export const createGrade = async (userID: string, grade: IGrade) => {
  return api.post(`${endpoint}/${userID}`, grade)
}
export const updateGrade = async (gradeID: string, grade: IGrade) => {
  return api.patch(`${endpoint}/${gradeID}`, grade)
}
export const deleteGrade = async (gradeID: string) => {
  return api.delete(`${endpoint}/${gradeID}`)
}

export interface ISectionsUtility {
  _id: string
  name?: string
}

async function getSectionNames(sections: ISectionsUtility[]) {
  const tmpSections: ISectionsUtility[] = [...sections]
  sections.forEach(async (section: ISectionsUtility, index: number) => {
    const res = await sectionService.getSection(section?._id)
    try {
      //@ts-ignore
      tmpSections[index] = { _id: res._id, name: res.name }
    } catch (err) {
      tmpSections[index] = { _id: section?._id, name: 'no section' }
    }
  })
  return tmpSections
}

export async function getGrades(userID: string) {
  const response = await api.get(`${endpoint}/${userID}`)
  if (response.status === 200) {
    const grades = [...response.data]
    const sections: ISectionsUtility[] = grades.map((grade: IGrade) => ({
      _id: grade.sectionId,
    }))
    return { grades, sections: getSectionNames(sections) }
  } else throw Error
}
