import api from './api';

interface Project {
    _id: string,
    teamId: string,
    parentProjectIds: string,
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
  const response = await api.get<Project[]>('/projects', config);
  return response.data.map( project => ({
      ...project,
      id: project._id,
      Name: project.projectName,
      URL: project.projectUrl,
      Description: project.description
  }) );
} 