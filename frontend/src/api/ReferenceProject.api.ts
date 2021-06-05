import api from './api.service'
import * as sectionService from './Section.api'
import { ProjectData, SectionData } from '../models'

const endpoint = `projects`

export const getRefProjects = async () => {
  return (await api.getMany<ProjectDto[]>(`${endpoint}`)).data.map((d) => ({
    ...d,
    startDate: new Date(d.startDate).toLocaleDateString(),
    endDate: new Date(d.endDate).toLocaleDateString(),
  }))
}

export const getRefProject = async (projectID: string): Promise<ProjectDto> => {
  const { data } = await api.get<PopulatedProject>(`${endpoint}/${projectID}`)

  return {
    ...data,
    id: data._id,
    sectionId: data.sectionId._id,
    sectionName: data.sectionId.name,
    startDate: new Date(data.sectionId.startDate).toLocaleDateString(),
    endDate: new Date(data.sectionId.endDate).toLocaleDateString(),
  }
}

export const createRefProject = async (project: Omit<ProjectData, '_id'>) => {
  return api.post<Omit<ProjectData, '_id'>, Project>(`${endpoint}`, project)
}

export const deleteRefProject = async (projectID: string) => {
  return api.delete<MessageResponse>(`${endpoint}/${projectID}`)
}

export const addRefProject = async (project: ProjectData) => {
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

export const updateRefProject = async (project: ProjectData) => {
  return api.patch<ProjectData, PopulatedProject>(
    `${endpoint}/${project._id}`,
    project,
  )
}

export interface ProjectDto {
  id: string
  projectName: string
  sectionName: string
  sectionId: string
  startDate: string
  description: string
  endDate: string
  projectUrl: string
}

export interface Project {
  _id: string
  sectionId: string
  projectName: string
  projectUrl: string
  description: string
  createdAt: string
  updatedAt?: string
}

export interface PopulatedProject {
  _id: string
  sectionId: SectionData
  projectName: string
  projectUrl: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface MessageResponse {
  message: string
}
