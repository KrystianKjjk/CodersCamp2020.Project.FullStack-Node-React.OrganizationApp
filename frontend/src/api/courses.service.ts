import BaseService from "../app/baseService";

export default class CoursesService {

    endpoint: string = '';
    httpConfig = {};

    constructor(private baseEndpoint: string, private httpService: BaseService) {
        this.endpoint = `${baseEndpoint}/courses`
        this.httpConfig = {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        }
    };

    async getCourse(id: string) {
        const endpoint = `${this.endpoint}/id`
        return this.httpService.get(endpoint,this.httpConfig);
    }

}
