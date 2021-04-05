import BaseService from "../app/baseService";

export default class ReferenceProjectsService {

    endpoint: string = '';

    constructor(private httpService: BaseService) {
        this.endpoint = `projects`
    };

    async getProjects() {
        return this.httpService.get(`${this.endpoint}`);
    }
}
