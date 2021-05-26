import api from './api.service'
import * as sectionService from './Section.api'
import { Section, ProjectData } from '../models'

const endpoint = `projects`

export const getRefProjects = async () => {
  return (await api.getMany<ProjectDto[]>(`${endpoint}`)).data.map((d) => ({
    ...d,
    startDate: new Date(d.startDate).toLocaleDateString(),
    endDate: new Date(d.endDate).toLocaleDateString(),
  }))
}
export const getRefProject = async (projectID: string) => {
  const response = await api.get<Project>(`${endpoint}/${projectID}`)
  return response.data
}
export const createRefProject = async (project: ProjectData) => {
  return api.post(`${endpoint}`, project)
}
export const deleteRefProject = async (projectID: string) => {
  return api.delete(`${endpoint}/${projectID}`)
}

export const addRefProject = async (project: any) => {
  const res = await createRefProject(project)
  try {
    const section = await sectionService.getOneSection(res.data.sectionId)
    return {
      ...res.data,
      'Section name': section?.name || '',
      course: section?.courseName,
    }
  } catch {
    return {
      ...res.data,
      'Section name': 'Section does not exist',
    }
  }
}

export const updateRefProject = async (project: any) => {
  return api.patch(`${endpoint}/${project._id}`, project)
}

export interface ProjectDto {
  id: string
  projectName: string
  sectionName: string
  sectionId: string
  startDate: string
  endDate: string
}

export interface Project {
  _id: string
  sectionId: Section
  projectName: string
  projectUrl: string
  description: string
  createdAt: string
  updatedAt: string
}
