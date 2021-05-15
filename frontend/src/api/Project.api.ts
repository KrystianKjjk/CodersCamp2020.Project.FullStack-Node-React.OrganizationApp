import { AxiosResponse } from 'axios'
import api from './api.service'
import { getSection } from './Section.api'
import { Project, ProjectData } from '../models'

export const getProject = async (id: string): Promise<Project | null> => {
  let projectRes: AxiosResponse<ProjectData>
  let project: ProjectData
  try {
    projectRes = await api.get(`/projects/${id}`)
    project = projectRes.data
  } catch (err) {
    return null
  }
  const section = await getSection(project.sectionId)
  return {
    id: project._id,
    name: project.projectName,
    sectionName: section?.name,
    url: project.projectUrl,
    description: project.description,
  }
}
