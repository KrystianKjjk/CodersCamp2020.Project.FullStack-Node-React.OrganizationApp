import UserRepository from '../Repositories/User';
import { UserModel as User } from '../Models/User';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


export default class UserService {
    repository: UserRepository;
    
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async logIn(email: string, password: string) {
        const user = await this.repository.getByEmail(email);
        if(!user) return null;
        const same = await bcrypt.compare(password, user.password)
        if(!same) return null;
        return user;
    }

    async findUserById(id: mongoose.ObjectId) {
        return this.repository.getById(id);
    }

    async getUsers() {
        return this.repository.getAll();
    }

    async createUser(user: User) {
        const rounds = 10;
        user.password = await bcrypt.hash(user.password, rounds);
        return this.repository.create(user);
    }

    async updateUser(id: mongoose.ObjectId, props: object) {
        return this.repository.updateById(id, props);
    }

    async deleteUser(id: mongoose.ObjectId) {
        return this.repository.deleteById(id);
    }

}