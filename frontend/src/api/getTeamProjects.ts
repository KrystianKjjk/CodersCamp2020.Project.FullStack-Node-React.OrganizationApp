import api from './api';
import getProject from  './getProject';
import getMentorSheets, { calcProjectGrade } from  './getMentorSheets';


interface ProjectData {
    _id: string;
    projectName: string;
    projectUrl: string;
    description: string;
    parentProjectId: string;
    teamId: {
        mentor: {
            _id: string;
        };
    };
}

interface Project {
    id: string;
    name: string;
    overallGrade: number;
    sectionName: string;
    url: string;
    description: string;
};

export default async function getTeamProjects(id: string, mentorId?: string): Promise<Project[]> {
    const projectsRes = await api.get<ProjectData[]>(`/teams/${id}/projects`);
    const projectsData = projectsRes.data;
    console.log(projectsRes);
    const projects = await Promise.all( projectsData.map( async project => {
        const parentProject = await getProject(project.parentProjectId);
        return {
            id: project._id,
            name: project.projectName,
            overallGrade: 0,
            sectionName: parentProject?.sectionName ?? '---',
            url: project.projectUrl,
            description: project.description,
    }} ) );
    const grades = await getMentorSheets(mentorId);
    console.log(grades);
    grades?.forEach(sheet => {
        const idx = projects.findIndex(project => project.id === sheet.projectID);
        if(idx > -1){
            projects[idx].overallGrade = calcProjectGrade(sheet);
        }
    })
    return projects;
}