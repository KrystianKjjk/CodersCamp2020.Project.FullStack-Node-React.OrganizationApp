import { AxiosResponse } from 'axios';
import BaseService from '../app/baseService';
import { Project, ProjectData, SectionData } from '../models';


export default class ProjectService {
    
    constructor(private api = new BaseService()) { }

    async getProject(id: string): Promise<Project | null> {
        let projectRes: AxiosResponse<ProjectData>;
        try {
            projectRes = await this.api.get(`/projects/${id}`);
        } catch(err) {
            return null;
        }
        console.log ('============================================================')
        console.log (projectRes.status)
        const project = projectRes.data;
        const sectionRes = await this.api.get(`/sections/${project.sectionId}`);
        const section = sectionRes.data as SectionData;
        console.log(projectRes);
        return {
            id: project._id,
            name: project.projectName,
            sectionName: section.name,
            url: project.projectUrl,
            description: project.description,
        };
    }

}
