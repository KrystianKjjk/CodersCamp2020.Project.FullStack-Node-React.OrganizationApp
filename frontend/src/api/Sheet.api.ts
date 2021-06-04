import api from './api.service'
import {
  Grades,
  Reviewer,
  GradeSheetDto,
  GradeSheetDetailsDto,
  GradeSheetDetails,
  GradeSheetData,
} from '../models'
import _ from 'lodash'

export const getSheets = async () => {
  const response = await api.get('/grade/sheets')
  const sheets = response.data as GradeSheetDto[]
  return sheets
}

export const getSheet = async (id: string): Promise<GradeSheetDetails> => {
  const response = await api.get<GradeSheetDetailsDto>('/grade/sheets/' + id)
  const sheet = response.data
  const reviewers: Reviewer[] = sheet.mentorReviewerGrades.map((rev, idx) => ({
    id: rev.mentorID,
    name: sheet.reviewers[idx].name,
    email: sheet.reviewers[idx].email,
    grades: rev.grades,
  }))
  return {
    ..._.omit(sheet, 'mentorReviewerGrades'),
    reviewers,
  }
}

export const createSheet = async () => {
  await api.post('/grade/sheets', {
    mentorId: '507f1f77bcf86cd799439011',
    projectId: '507f1f77bcf86cd799439011',
  })
}

export const deleteSheet = async (id: string) => {
  await api.delete('/grade/sheets/' + id)
}

export const getMentorSheets = async (
  mentorId?: string,
): Promise<GradeSheetData[] | null> => {
  const gradeSheetsRes = await api.get(`/mentors/${mentorId}/grade/sheets`)
  return gradeSheetsRes.data as GradeSheetData[]
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
