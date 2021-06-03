import api from './api.service'
import * as sectionService from './Section.api'
import { ProjectData } from '../models'
import { Section, SectionData } from '../models/Section.model'

const endpoint = `projects`

export const getRefProjects = async () => {
  return (await api.getMany<ProjectDto[]>(`${endpoint}`)).data.map((d) => ({
    ...d,
    startDate: new Date(d.startDate).toLocaleDateString(),
    endDate: new Date(d.endDate).toLocaleDateString(),
  }))
}
export const getRefProject = async (
  projectID: string,
): Promise<ProjectSectionData> => {
  const response = await api.get<Project>(`${endpoint}/${projectID}`)

  return {
    ...response.data,
    sectionId: {
      id: response.data.sectionId._id,
      name: response.data.sectionId.name,
    },
  }
}
export const createRefProject = async (project: Omit<ProjectData, '_id'>) => {
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
      sectionName: section?.name || '',
      course: section?.courseName,
    }
  } catch {
    return {
      ...res.data,
      sectionName: 'Section does not exist',
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
  sectionId: SectionData
  projectName: string
  projectUrl: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface ProjectSectionData extends Omit<Project, 'sectionId'> {
  sectionId: Section
}
