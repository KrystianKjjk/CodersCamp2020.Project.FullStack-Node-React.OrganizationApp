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

export interface TeamProjectDto {
  id: string
  teamProjectName: string
  mentor: {
    id: string
    name: string
    surname: string
  }
  referenceProject: {
    id: string
    projectName: string
  }
  section: {
    id: string
    sectionName: string
  }
}
