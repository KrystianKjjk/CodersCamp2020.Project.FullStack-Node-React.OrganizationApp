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
}

export interface GradeSheetDto {
  id: string
  projectId: string
  projectName: string
  mentorId: string
  mentorName: string
  mentorSurname: string
}

export interface GradeSheetDetailsDto {
  id: string
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
  mentorReviewerGrades: {
    mentorId: string
    grades: { [prop: string]: Grade }
  }[]
}
