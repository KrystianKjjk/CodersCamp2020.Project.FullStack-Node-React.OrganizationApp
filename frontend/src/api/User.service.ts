import BaseService from '../app/baseService';
import { userStatusDict, userTypeDict, User, UserData } from '../models/User.model';


export default class UserService {
    
    constructor(private api = new BaseService()) { };

    getUsers = async (): Promise<User[]> => {
        const response = await this.api.get('/users');
        return response.data.map( (user: UserData) => ({
            ...user,
            id: user._id,
            type: userTypeDict[user.type],
            status: userStatusDict[user.status],
        }) );
    }
}