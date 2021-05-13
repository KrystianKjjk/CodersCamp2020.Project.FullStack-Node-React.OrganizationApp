import api from './api.service'
import { TeamProject, TeamProjectData } from '../models'
import { calcProjectGrade, getMentorSheets } from './'
import { getProject } from './Project.api'

export async function getTeamProjects(
  id: string,
  mentorId?: string,
): Promise<TeamProject[]> {
  const projectsRes = await api.get(`/teams/${id}/projects`)
  const projectsData = projectsRes.data as TeamProjectData[]
  const projects = await Promise.all(
    projectsData.map(async (project) => {
      const parentProject = await getProject(project.parentProjectId)
      return {
        id: project._id,
        name: project.projectName,
        overallGrade: 0,
        sectionName: parentProject?.sectionName ?? '---',
        url: project.projectUrl,
        description: project.description,
      }
    }),
  )
  const grades = await getMentorSheets(mentorId)
  grades?.forEach((sheet) => {
    const idx = projects.findIndex((project) => project.id === sheet.projectID)
    if (idx > -1) {
      projects[idx].overallGrade = calcProjectGrade(sheet)[0]
    }
  })
  return projects
}

export const getTeamProject = async (id: string): Promise<TeamProject> => {
  const response = await api.get('/teams/projects/' + id)
  const project: TeamProjectData = response.data
  return {
    ...project,
    id: project._id,
    name: project.projectName,
    url: project.projectUrl,
  }
}
