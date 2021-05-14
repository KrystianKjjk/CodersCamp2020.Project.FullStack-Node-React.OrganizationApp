export interface ManageSectionData {
  _id: string
  name: string
  startDate?: string
  endDate?: string
  description?: string
  course: string
}

export interface NewSectionData extends Omit<ManageSectionData, '_id'> {}

export interface ManageSection {
  id: string
  name: string
  startDate?: number
  endDate?: number
  description?: string
  courseName: string
  courseId: string
}

export interface SectionData {
  _id: string
  name: string
  startDate: string
  endDate: string
  referenceProjectId: string
  description: string
}

export interface Section {
  id: string
  name: string
}
