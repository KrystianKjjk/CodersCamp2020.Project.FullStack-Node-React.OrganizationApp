import api from './api.service'

const endpoint = `projects`

export const getRefProjects = async () => {
  return api.get(`${endpoint}`)
}
export const getRefProjectByID = async (projectID: string) => {
  return api.get(`${endpoint}/${projectID}`)
}
export const createRefProject = async (project: any) => {
  return api.post(`${endpoint}`, project)
}
export const updateRefProject = async (project: any) => {
  return api.patch(`${endpoint}/${project._id}`, project)
}
export const deleteRefProject = async (projectID: string) => {
  return api.delete(`${endpoint}/${projectID}`)
}
