import BaseService from "../app/baseService";

export default class ReferenceProjectsService {

    endpoint: string = '';

    constructor(private httpService: BaseService = new BaseService()) {
        this.endpoint = `projects`
    };

    async getProjects() {
        return this.httpService.get(`${this.endpoint}`);
    }
    async createProject(project: any) {
        return this.httpService.post(`${this.endpoint}`, project);
    }
    async updateProject(project: any) {
        return this.httpService.patch(`${this.endpoint}/${project._id}`, project);
    }
    async deleteProject(projectID: string) {
        return this.httpService.delete(`${this.endpoint}/${projectID}`);
    }
}
