import BaseService from '../app/baseService';
import { TeamProject, TeamProjectData } from '../models';
import { ProjectService, SheetService, calcProjectGrade } from './';


export default class TeamProjectService {
    
    constructor(
        private api = new BaseService(),
        private projectApi = new ProjectService(),
        private sheetApi = new SheetService()
    ) { }

    getTeamProjects = async (teamId: string, mentorId?: string): Promise<TeamProject[]> => {
        const projectsRes = await this.api.get(`/teams/${teamId}/projects`);
        const projectsData = projectsRes.data as TeamProjectData[];
        console.log(projectsRes);
        const projects = await Promise.all( projectsData.map( async project => {
            const parentProject = await this.projectApi.getProject(project.parentProjectId);
            return {
                id: project._id,
                name: project.projectName,
                overallGrade: 0,
                sectionName: parentProject?.sectionName ?? '---',
                url: project.projectUrl,
                description: project.description,
        }} ) );
        const grades = await this.sheetApi.getMentorSheets(mentorId);
        console.log(grades);
        grades?.forEach(sheet => {
            const idx = projects.findIndex(project => project.id === sheet.projectID);
            if(idx > -1){
                projects[idx].overallGrade = calcProjectGrade(sheet)[0];
            }
        })
        return projects;
    }

    getTeamProject = async (id: string): Promise<TeamProject> => {
        const response = await this.api.get('/team/projects/' + id);
        const project: TeamProjectData = response.data;
        return {
            ...project,
            id: project._id,
            name: project.projectName,
            url: project.projectUrl,
        }
    }

}
