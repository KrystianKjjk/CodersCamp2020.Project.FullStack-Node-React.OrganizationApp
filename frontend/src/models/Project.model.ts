export interface ProjectDataForSection {
  _id: string
  projectName: string
  sectionId: string
}

export interface ProjectForSection {
  id: string
  projectName: string
}

export interface ProjectData {
  _id: string
  sectionId: string
  projectName: string
  projectUrl: string
  description: string
}

export interface Project {
  id: string
  name: string
  sectionName?: string
  url: string
  description: string
}
