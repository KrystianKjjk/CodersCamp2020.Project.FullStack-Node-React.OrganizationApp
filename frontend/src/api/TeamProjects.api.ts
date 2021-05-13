import api from './api.service'
import { TeamProjectDto, ProjectData, TeamData } from '../models'

// todo: get projects for course

const getTeamProjects = async () => {
  const course = localStorage.getItem('activeCourse')
  const courseId = course ? JSON.parse(course)._id : null

  const response = await api.get<TeamProjectDto[]>('/teams/projects')

  // const allProjects = await Promise.all(response.data.map((project: TeamProject) => getProjectDetailedData(project)));
  //@ts-ignore
  //   if (courseId)
  //     return allProjects.filter((project) => project.CourseId === courseId)
  return response.data
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
  teamId?: TeamData
}
const getTeamProject = async (id: string) => {
  const response = await api.get<TeamProjectDetails>(`/teams/projects/${id}`)
  console.log('projects details ', response)
  return response.data
}

export { getTeamProjects, getTeamProject }
