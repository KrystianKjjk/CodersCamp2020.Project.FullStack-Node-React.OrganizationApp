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
        const users = await this.repository.getByEmail(email);
        if(users.length < 1) return null;
        let user = users[0] as User & mongoose.Document;
        bcrypt.compare(password, user.password, (err, same) => {
            if(err) throw err;
            if(!same) user = null;
        })
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
        bcrypt.hash(user.password, rounds, (err, enc) => {
            if(err) throw err;
            user.password = enc;
        });
        return this.repository.create(user);
    }

    async updateUser(id: mongoose.ObjectId, props: object) {
        return this.repository.updateById(id, props);
    }

    async deleteUser(id: mongoose.ObjectId) {
        return this.repository.deleteById(id);
    }

}