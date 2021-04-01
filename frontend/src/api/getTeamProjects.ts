import api from './api';

interface TeamProject {
    _id: string,
    teamId: Team,
    parentProjectIds: Project,
    projectName: string,
    projectUrl: string,
    description: string
}

interface Team {
    _id: string,
    mentor: string;
    users: string[];
    course: string
}

interface Project {
    _id: string,
    sectionId: number,
    projectName: string,
    projectUrl: string,
    description: string
}

 export default async function getProjects(authToken: string): Promise<any[]> {
  const config = {
      headers: {
          'x-auth-token': authToken,
      }
  };
  const response = await api.get<TeamProject[]>('/projects', config);
  return response.data.map( project => ({
      ...project,
      id: project._id,
      Mentor: project.teamId.mentor,
      Name: project.projectName,
      ReferenceProject: project.parentProjectIds.projectName,
      Section: project.parentProjectIds.sectionId
  }) );
} 