import BaseService from "../app/baseService";

export default class CoursesService {

    endpoint: string = '';

    constructor(private baseEndpoint: string, private httpService: BaseService) {
        this.endpoint = `courses`
    };

    async getCourse(id: string) {
        const endpoint = `${this.endpoint}/${id}`;
        return this.httpService.get(endpoint);
    }

}
