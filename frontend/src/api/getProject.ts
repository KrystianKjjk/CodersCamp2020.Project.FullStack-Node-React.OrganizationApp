import api from './api';
import { TeamInfo } from '../components/ManageTeam/ManageTeam';
import { User as UserData, userStatusDict } from  './getUsers';
import { User } from '../components/ManageTeam/ManageTeam';

interface SectionData {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    referenceProjectId: string;
    description: string;
}

interface ProjectData {
    _id: string;
    sectionId: string;
    projectName: string;
    projectUrl: string;
    description: string;
}

interface Project {
    id: string;
    name: string;
    sectionName: string;
    url: string;
    description: string;
};

export default async function getTeamProjects(authToken: string, id: string): Promise<Project | null> {
    const config = {
        headers: {
            'x-auth-token': authToken,
        }
    };
    let projectRes;
    try {
        projectRes = await api.get<ProjectData>(`/projects/${id}`, config);
    } catch(err) {
        return null;
    }
    console.log ('============================================================')
    console.log (projectRes.status)
    const project = projectRes.data;
    const sectionRes = await api.get<SectionData>(`/sections/${project.sectionId}`, config);
    const section = sectionRes.data;
    console.log(projectRes);
    return {
        id: project._id,
        name: project.projectName,
        sectionName: section.name,
        url: project.projectUrl,
        description: project.description,
    };
}