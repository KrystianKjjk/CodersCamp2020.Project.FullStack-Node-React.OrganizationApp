import api from './api.service'
import { TeamProjectDto } from '../models'

// todo: get projects for course

const getTeamProjects = async () => {
  const course = localStorage.getItem('activeCourse')
  const courseId = course ? JSON.parse(course)._id : null

  const response = await api.get<TeamProjectDto[]>('/teams/projects')
  console.log('projects', response)

  // const allProjects = await Promise.all(response.data.map((project: TeamProject) => getProjectDetailedData(project)));
  //@ts-ignore
  //   if (courseId)
  //     return allProjects.filter((project) => project.CourseId === courseId)
  return response.data
}

export { getTeamProjects }
