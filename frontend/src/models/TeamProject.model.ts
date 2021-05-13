export interface TeamProjectData {
  _id: string
  projectName: string
  projectUrl: string
  description: string
  parentProjectId: string
  teamId: {
    mentor: {
      _id: string
    }
  }
}

export interface TeamProject {
  id: string
  name: string
  overallGrade?: number
  sectionName?: string
  url: string
  description: string
}
