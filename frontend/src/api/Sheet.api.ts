import api from './api.service'
import {
  GradeSheet,
  GradeSheetData,
  TeamProjectData,
  UserData,
  Grades,
  Participant,
  Reviewer,
} from '../models'
import _ from 'lodash'

export const getSheets = async () => {
  const response = await api.get('/grade/sheets')
  const sheetsData = response.data as GradeSheetData[]
  const sheets: GradeSheet[] = []
  for (let i in sheetsData) {
    const sheet = await getSheetInfo(sheetsData[i])
    sheets.push(sheet)
  }

  return sheets
}

export const getSheetInfo = async (
  sheet: GradeSheetData,
): Promise<GradeSheet> => {
  let mentorName: string, mentorSurname: string
  try {
    const mentorRes = await api.get('/users/' + sheet.mentorID)
    const mentor = mentorRes.data as UserData
    ;[mentorName, mentorSurname] = [mentor.name, mentor.surname]
  } catch (err) {
    ;[mentorName, mentorSurname] = ['---', '---']
  }

  let projectName: string, projectUrl: string, projectDescription: string
  try {
    const projectRes = await api.get('/teams/projects/' + sheet.projectID)
    const project: TeamProjectData = projectRes.data
    projectName = project.projectName
    projectUrl = project.projectUrl
    projectDescription = project.description
  } catch (err) {
    projectName = '---'
    ;[projectName, projectUrl, projectDescription] = ['---', '---', '---']
  }

  const participants = sheet.participants ?? []
  for (let i in participants) {
    const user = participants[i]
    try {
      const userRes = await api.get('/users/' + user.participantID)
      const userData = userRes.data as UserData
      participants[i].name = userData.name
      participants[i].surname = userData.surname
    } catch (err) {
      participants[i].name = '---'
      participants[i].surname = '---'
    }
  }

  const reviewers = sheet.reviewers ?? []
  const reviewersInfo = await Promise.all(
    reviewers.map(async (userId) => {
      const reviewer: Reviewer = {
        _id: userId,
        name: '---',
        surname: '---',
        email: '---',
      }
      try {
        const userRes = await api.get('/users/' + userId)
        const userData = userRes.data as UserData
        reviewer._id = userId
        reviewer.name = userData.name
        reviewer.surname = userData.surname
        reviewer.email = userData.surname
      } catch (err) {}
      return reviewer
    }),
  )

  return {
    ..._.omit(sheet, '_id'),
    id: sheet._id,
    projectID: sheet.projectID ?? '',
    mentorID: sheet.mentorID ?? '',
    participants,
    mentorGrades: sheet.mentorGrades ?? {},
    mentorName,
    mentorSurname,
    projectName,
    projectUrl,
    projectDescription,
    reviewers: reviewersInfo,
  }
}

export const getSheet = async (id: string) => {
  const response = await api.get('/grade/sheets/' + id)
  return getSheetInfo(response.data)
}

export const createSheet = async () => {
  await api.post('/grade/sheets', {
    mentorID: '507f1f77bcf86cd799439011',
    projectID: '507f1f77bcf86cd799439011',
  })
}

export const deleteSheet = async (id: string) => {
  await api.delete('/grade/sheets/' + id)
}

export const getMentorSheets = async (
  mentorId?: string,
): Promise<GradeSheetData[] | null> => {
  let gradeSheetsRes
  try {
    gradeSheetsRes = await api.get(`/mentors/${mentorId}/grade/sheets`)
  } catch (err) {
    return null
  }
  return gradeSheetsRes.data as GradeSheetData[]
}

export const getParticipants = async (
  id: string,
): Promise<(Participant & { id: string })[]> => {
  const sheet = await getSheet(id)
  return sheet.participants.map((p) => ({
    ...p,
    id: p.participantID,
  }))
}

export const getMentorGrades = async (id: string): Promise<Grades> => {
  const sheet = await getSheet(id)
  return sheet.mentorGrades
}

export const setMentor = async (id: string, mentorId: string) => {
  await api.put(`/grade/sheets/${id}/set/mentor/${mentorId}`, {})
}

export const setProject = async (id: string, projectId: string) => {
  await api.put(`/grade/sheets/${id}/set/project/${projectId}`, {})
}

export const addParticipant = async (id: string, participantId: string) => {
  await api.post(`/grade/sheets/${id}/add/participant/${participantId}`, {})
}

export const deleteParticipant = async (id: string, participantId: string) => {
  await api.delete(`/grade/sheets/${id}/participants/${participantId}`)
}

export const addReviewer = async (id: string, mentorId: string) => {
  await api.post(`/grade/sheets/${id}/add/reviewer/${mentorId}`, {})
}

export const setReviewers = async (id: string, reviewers: string[]) => {
  await api.put(`/grade/sheets/${id}/reviewers`, { reviewers })
}

export const setMentorReviewerGrade = async (
  id: string,
  mentorId: string,
  grades: Grades,
) => {
  await api.put(`/grade/sheets/${id}/reviewers/${mentorId}/grades`, { grades })
}

export const patchMentorReviewerGrade = async (
  id: string,
  mentorId: string,
  grades: Grades,
) => {
  await api.patch(`/grade/sheets/${id}/reviewers/${mentorId}/grades`, {
    grades,
  })
}

export const setMentorGrade = async (id: string, grades: Grades) => {
  await api.put(`/grade/sheets/${id}/mentor/grades`, { grades })
}

export const patchMentorGrade = async (id: string, grades: Grades) => {
  await api.patch(`/grade/sheets/${id}/mentor/grades`, { grades })
}
