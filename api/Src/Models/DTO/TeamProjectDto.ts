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
