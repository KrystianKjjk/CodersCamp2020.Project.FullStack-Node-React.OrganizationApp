import { Grade } from '../GradeSheet'

export interface ParticipantDto {
  id: string
  name: string
  engagement?: number
  role?: string
  rolePoints?: number
}

export interface ReviewerDto {
  id: string
  name: string
  email: string
  grades: {
    [prop: string]: Grade
  }
}

export interface GradeSheetDto {
  projectId: string
  projectName: string
  projectUrl: string
  projectDescription: string
  mentorId: string
  mentorName: string
  mentorGrades: {
    [prop: string]: Grade
  }
  participants: ParticipantDto[]
  reviewers: ReviewerDto[]
}
