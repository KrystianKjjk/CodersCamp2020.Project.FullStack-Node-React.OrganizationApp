export interface SheetGrade {
  points: number
  description?: string
  comment?: string
}

export interface Grades {
  [grade: string]: SheetGrade
}

export interface Participant {
  participantID: string
  engagement?: number
  role?: string
  rolePoints?: number
  name?: string
  surname?: string
}

export interface Reviewer {
  _id: string
  email: string
  name: string
  surname: string
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

export interface GradeSheet {
  id: string
  projectID: string
  projectName: string
  projectUrl: string
  projectDescription: string
  mentorID: string
  mentorName: string
  mentorSurname: string
  participants: Participant[]
  reviewers: Reviewer[]
  mentorGrades: Grades
  mentorReviewerGrades: {
    mentorID: string
    grades: Grades
  }[]
}
