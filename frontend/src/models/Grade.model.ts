export interface SheetGrade {
  points: number
  description?: string
  comment?: string
}

export interface Grades {
  [grade: string]: SheetGrade
}

export interface Participant {
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

export interface GradeSheetData {
  _id: string
  projectID: string
  mentorID: string
  participants: Participant[]
  reviewers: string[]
  mentorGrades: Grades
  mentorReviewerGrades: {
    mentorID: string
    grades: Grades
  }[]
}

export interface GradeSheetDetailsDto {
  id: string
  projectId: string
  projectName: string
  projectUrl: string
  projectDescription: string
  mentorId: string
  mentorName: string
  mentorGrades: Grades
  participants: Participant[]
  reviewers: ReviewerDto[]
  mentorReviewerGrades: {
    mentorId: string
    grades: Grades
  }[]
}

export interface Reviewer {
  id: string
  name: string
  email: string
  grades: Grades
}

export type GradeSheetDetails = Omit<
  GradeSheetDetailsDto,
  'mentorReviewerGrades'
> & {
  reviewers: Reviewer[]
}
