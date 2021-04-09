import BaseService from "../app/baseService";

export default class SectionService {

    endpoint: string = '';

    constructor(private httpService: BaseService = new BaseService()) {
        this.endpoint = `sections`
    };

    async getSection(sectionID: string) {
        return this.httpService.get(`${this.endpoint}/${sectionID}`);
    }
}
