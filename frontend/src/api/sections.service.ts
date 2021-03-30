import BaseService from "../app/baseService";

export default class SectionsService {

    endpoint: string = '';
    httpConfig = {};

    constructor(private baseEndpoint: string, private httpService: BaseService) {
        this.endpoint = `${baseEndpoint}/sections`
        this.httpConfig = {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        }
    };

    async getSections() {
        return this.httpService.get(this.endpoint,this.httpConfig);
    }

}
