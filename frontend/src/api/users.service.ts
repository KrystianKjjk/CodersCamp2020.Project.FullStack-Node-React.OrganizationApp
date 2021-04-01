import BaseService from "../app/baseService";
import {IUser} from "../models/user.model";

export default class UserService {

    endpoint: string = '';

    constructor(private httpService: BaseService) {
        this.endpoint = `users`
    };

    async getUser(userID: string) {
        return this.httpService.get(`${this.endpoint}/${userID}`);
    }
    async deleteUser(userID: string) {
        return this.httpService.delete(`${this.endpoint}/${userID}`);
    }
    async updateUser(userID: string, user: IUser) {
        return this.httpService.patch(`${this.endpoint}/${userID}`, user);
    }
}
