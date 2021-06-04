import api from './api.service'
import {
  calcProjectGrade,
  calcUserProjectGrade,
  calcUserTasksGrade,
  calcUserTestsGrade,
} from '.'
import {
  CourseData,
  Team,
  TeamData,
  TeamInfo,
  TeamProject,
  TeamProjectData,
  User,
  UserData,
  userStatusDict,
  userTypeDict,
} from '../models'
import { getMentorSheets } from './Sheet.api'
import { getProject } from './Project.api'

async function getTeamProjects(
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

export const getTeams = async (courseId?: string): Promise<Team[]> => {
  const courseRes = await api.get('/courses/' + (courseId ?? ''))
  const course = courseRes.data as CourseData
  const teams = (await api.get(`courses/${course._id}/teams`))
    .data as TeamData[]
  return teams.map((team) => ({
    id: team._id,
    name: team?.mentor?.name ?? '---',
    surname: team?.mentor?.surname ?? '---',
    courseName: course.name,
    users: team.users,
  }))
}

export const getTeam = async (id: string): Promise<TeamInfo> => {
  const teamRes = await api.get('/teams/' + id)
  const team = teamRes.data as TeamData
  const projects = await getTeamProjects(id, team.mentor?._id)
  const sheets = await getMentorSheets(team.mentor?._id)
  const teamInfo: TeamInfo = {
    id: team._id,
    mentor: {
      id: team?.mentor?._id ?? '---',
      name: team?.mentor?.name ?? '---',
      surname: team?.mentor?.surname ?? '---',
    },
    users: [],
    projects,
    teamAvgGrade: 100,
    maxPoints: 99,
  }
  teamInfo.users = team.users.map(
    (user: UserData): User => {
      const [tasksPoints, tasksMaxPoints] = calcUserTasksGrade(user)
      const [testsPoints, testsMaxPoints] = calcUserTestsGrade(user)
      let [projectsPoints, projectsMaxPoints] = [0, 0]
      sheets?.forEach((sheet) => {
        const grade = calcUserProjectGrade(sheet, user._id)
        if (grade) {
          projectsPoints += grade[0]
          projectsMaxPoints += grade[1]
        }
      })
      const averageGrade =
        3 * tasksPoints + 2 * testsPoints + 5 * projectsPoints
      const maxGrade =
        3 * tasksMaxPoints + 2 * testsMaxPoints + 5 * projectsMaxPoints
      return {
        ...user,
        id: user._id,
        name: user.name,
        surname: user.surname,
        type: userTypeDict[user.type],
        status: userStatusDict[user.status],
        averageGrade,
        maxGrade,
      }
    },
  )
  teamInfo.teamAvgGrade =
    teamInfo.users.reduce((acc, user) => user.averageGrade ?? 0 + acc, 0) /
    teamInfo.users.length
  return teamInfo
}

export const setMentor = async (teamId: string, mentorId: string) => {
  const reqBody = {
    mentor: mentorId,
  }
  await api.patch(`/teams/${teamId}`, reqBody)
}

export const addUserToTeam = async (teamId: string, userId: string) => {
  await api.post(`teams/${teamId}/users`, { userId })
}

export const deleteUserFromTeam = async (teamId: string, userId: string) => {
  await api.delete(`teams/${teamId}/users/${userId}`)
}

export const createTeam = async ({
  courseId,
  mentorId,
}: {
  courseId: string
  mentorId: string
}) => {
  await api.post('/teams', { course: courseId ?? null, mentor: mentorId })
}

export const deleteTeam = async (id: string) => {
  await api.delete('/teams/' + id)
}
