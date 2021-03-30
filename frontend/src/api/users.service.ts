import BaseService from "../app/baseService";
import {IUser} from "../models/user.model";

export default class UserService {

    endpoint: string = '';
    httpConfig = {};

    constructor(private baseEndpoint: string, private httpService: BaseService) {
        this.endpoint = `${baseEndpoint}/users`
        this.httpConfig = {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        }
    };

    async getUser(userID: string) {
        return this.httpService.get(`${this.endpoint}/${userID}`,this.httpConfig);
    }
    async deleteUser(userID: string) {
        return this.httpService.delete(`${this.endpoint}/${userID}`,this.httpConfig);
    }
    async updateUser(userID: string, user: IUser) {
        return this.httpService.patch(`${this.endpoint}/${userID}`, user, this.httpConfig);
    }
}
