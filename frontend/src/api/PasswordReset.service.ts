import BaseService from '../app/baseService';
import UserService from './User.service';
import { User } from '../models/User.model'

export default class PasswordResetService {
    
    constructor(
        private api = new BaseService(),
        private usersApi = new UserService()
    ) { };

    getUserByEmail = async (email: string): Promise<User | undefined> => {
        const users = await this.usersApi.getUsers();
        return users.find((user: User) => user.email === email);
    }

    sendPasswordReset = async (email: string) => {
        const user = await this.getUserByEmail(email);
        if (!user) return false;
        const userId = user.id;
        await this.api.post(`users/requestpasswordreset`, { userId });
        return true
    }
}