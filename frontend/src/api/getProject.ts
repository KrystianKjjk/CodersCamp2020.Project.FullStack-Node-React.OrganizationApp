import api from './api';


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

export default async function getTeamProjects(id: string): Promise<Project | null> {
    let projectRes;
    try {
        projectRes = await api.get<ProjectData>(`/projects/${id}`);
    } catch(err) {
        return null;
    }
    console.log ('============================================================')
    console.log (projectRes.status)
    const project = projectRes.data;
    const sectionRes = await api.get<SectionData>(`/sections/${project.sectionId}`);
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