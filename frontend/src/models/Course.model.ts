export interface CourseData {
  _id: string
  name: string
}

export interface CourseDataForSection {
  _id: string
  name: string
}

export interface CourseForSection {
  id: string
  courseName: string
}

export interface Course {
  _id: string
  sections: SectionListElement[]
  name: string
  description?: string
  startDate: string
  endDate: string
}

export interface CourseCreateObject {
  name: string
  description?: string
  startDate: Date
  endDate: Date
}

export interface CourseDto {
  _id: string
  name: string
  description?: string
  startDate: string
  endDate: string
}

export interface SectionListElement {
  _id: string
  name: string
}

export interface CourseState {
  sectionsIdToDelete: string[]
}
