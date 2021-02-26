import UserRepository from '../Repositories/User';
import { UserModel as User } from '../Models/User';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


export default class UserService {
    repository: UserRepository;
    rounds: number = 10;
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async logIn(email: string, password: string): Promise<mongoose.Document<User> & User | null> {
        const user = await this.repository.getByEmail(email);
        if(!user) return null;
        const same = await bcrypt.compare(password, user.password)
        if(!same) return null;
        return user;
    }

    async findUserById(id: mongoose.Types.ObjectId) {
        return this.repository.getById(id);
    }

    async getUsers(): Promise<(User & mongoose.Document<User>)[]> {
        return this.repository.getAll();
    }

    async createUser(user: User) {
        user.password = await bcrypt.hash(user.password, this.rounds);
        return this.repository.create(user);
    }

    async updateUser(id: mongoose.Types.ObjectId, props: {
        [prop: string]: any;
        password?: string
    }) {
        if(props.password) {
            const password = await bcrypt.hash(props.password, this.rounds);
            props.password = password;
        }
        return this.repository.updateById(id, props);
    }

    async deleteUser(id: mongoose.Types.ObjectId) {
        return this.repository.deleteById(id);
    }

}