import {IGrade} from "../models/user.model";
import BaseService from "../app/baseService";

export default class GradeService {

    endpoint: string = '';

    constructor(private httpService: BaseService) {
        this.endpoint = `grades`

    };

    async getGrades(userID: string) {
        return this.httpService.get(`${this.endpoint}/${userID}`);
    }
    async createGrade(userID: string, grade: IGrade) {
        return this.httpService.post(`${this.endpoint}/${userID}`, grade);
    }
    async updateGrade(gradeID: string, grade: IGrade) {
        return this.httpService.patch(`${this.endpoint}/${gradeID}`, grade);
    }
    async deleteGrade(gradeID: string) {
        return this.httpService.delete(`${this.endpoint}/${gradeID}`);
    }
}
