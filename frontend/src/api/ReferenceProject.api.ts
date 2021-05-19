import api from './api.service'
import * as sectionService from './Section.api'

const endpoint = `projects`

export const getRefProjects = async () => {
  return api.get<any[]>(`${endpoint}`)
}
export const getRefProjectByID = async (projectID: string) => {
  return api.get(`${endpoint}/${projectID}`)
}
export const createRefProject = async (project: any) => {
  return api.post(`${endpoint}`, project)
}
export const deleteRefProject = async (projectID: string) => {
  return api.delete(`${endpoint}/${projectID}`)
}

export const fetchRefProjects = async () => {
  const response = await getRefProjects()
  const projects = response.data
  const projectsExtended = await Promise.all(
    projects.map(async (project: any) => {
      try {
        if (!project?.sectionId) throw Error
        const section = await sectionService.getOneSection(project.sectionId)
        return {
          ...project,
          id: project._id,
          Name: project.projectName,
          'Section name': section?.name || '',
          course: section?.courseName,
        }
      } catch {
        return {
          ...project,
          id: project._id,
          Name: project.projectName,
          'Section name': 'Section does not exist',
        }
      }
    }),
  )

  return projectsExtended
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
