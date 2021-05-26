import api from './api.service'

// todo: get projects for course

const getTeamProjects = async () => {
  const response = await api.getMany<TeamProjectDto[]>('/teams/projects')
  return response.data
}
const getTeamProject = async (id: string) => {
  const response = await api.get<TeamProjectDetails>(`/teams/projects/${id}`)
  return response.data
}

const deleteTeamProject = async (id: string) => {
  const response = await api.delete(`/teams/projects/${id}`)
  console.log('projects details ', response)
  return response.data
}

const createTeamProject = async (data: TeamProject) => {
  const response = await api.post<TeamProject>(`/teams/projects`, data)
  return response.data
}
const updateTeamProject = async (data: TeamProject) => {
  const response = await api.put<TeamProject>(
    `/teams/projects/${data._id}`,
    data,
  )
  return response.data
}

export {
  getTeamProjects,
  getTeamProject,
  deleteTeamProject,
  createTeamProject,
  updateTeamProject,
}

export interface TeamProject {
  _id?: string
  teamId?: string
  parentProjectId?: string
  projectName?: string
  projectUrl?: string
  description?: string
}

export interface TeamProjectDto {
  id: string
  teamProjectName: string
  mentorName: string
  mentorId: string
  referenceProjectId: string
  referenceProjectName: string
  sectionId: string
  sectionName: string
}

export interface TeamProjectDetails {
  _id: string
  parentProjectId?: {
    _id: string
    projectName: string
    sectionId: {
      id: string
      statDate: Date
      endDate: Date
      name: string
      description: string
      tests: []
    }
  }
  projectName?: string
  projectUrl?: string
  description?: string
  teamId?: {
    users: string[]
    _id: string
    mentor: {
      _id: string
      name: string
      surname: string
    }
  }
}
