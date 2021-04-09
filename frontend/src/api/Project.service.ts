import { AxiosResponse } from 'axios';
import { SectionService } from '.';
import BaseService from '../app/baseService';
import { Project, ProjectData } from '../models';


export default class ProjectService {
    
    constructor(
        private api = new BaseService(),
        private sectionApi = new SectionService()
    ) { }

    async getProject(id: string): Promise<Project | null> {
        let projectRes: AxiosResponse<ProjectData>;
        let project: ProjectData;
        try {
            projectRes = await this.api.get(`/projects/${id}`);
            console.log ('============================================================')
            project = projectRes.data;
            console.log(project)
        } catch(err) {
            return null;
        }
        const section = await this.sectionApi.getSection(project.sectionId);
        return {
            id: project._id,
            name: project.projectName,
            sectionName: section?.name,
            url: project.projectUrl,
            description: project.description,
        };
    }

}
