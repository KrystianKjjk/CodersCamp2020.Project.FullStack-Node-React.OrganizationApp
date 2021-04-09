import BaseService from "../app/baseService";

export default class SectionsService {

    endpoint: string = '';

    constructor(private httpService: BaseService) {
        this.endpoint = `sections`
    };

    async getSections() {
        return this.httpService.get(this.endpoint);
    }

    async getSectionByID(sectionID: string) {
        return this.httpService.get(`${this.endpoint}/${sectionID}`);
    }

}
