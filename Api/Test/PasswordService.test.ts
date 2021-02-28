import PasswordService from '../Src/Services/Password';
import UserService from '../Src/Services/User';
import UserRepository from '../Src/Repositories/User';
import {Repository} from '../Src/Repositories/Repository'
import { UserModel } from '../Src/Models/User';
import { PasswordResetTokenModel } from '../Src/Models/PasswordResetToken';
import UserDbModel from '../Src/Models/User';
import { Document, Types } from 'mongoose';
import { notDeepEqual } from 'assert';

class TestRepository extends UserRepository {
    users: Array<UserModel & Document>;
    tokens: Array<PasswordResetTokenModel & Document>;
    constructor() {
        super(UserDbModel);
        this.users = [];
        this.tokens = []
    };

    async clear() {
        this.users = [];
    };

    async getAll() {
        return this.users;
    };

    async getById(id: Types.ObjectId) {
        return this.users.find(user => user._id === id);
    };

    async create(user: UserModel) {
        const newUser = new this.model(user) as UserModel & Document;
        this.users.push(newUser);
    };

    async updateById(id: Types.ObjectId, props: object) {
        const index = this.users.findIndex(user => user._id === id);
        Object.assign(this.users[index], props)
    };

    async deleteById(id: Types.ObjectId) {
        this.users = this.users.filter(user => user._id !== id)
    };

}

const testRepo = new TestRepository()
const service = new PasswordService(testRepo, testRepo);
const userService = new UserService(testRepo);

describe('Test Password Service', () => {
    const nUsers = 10;
    let users: Array<UserModel & Document>;
    
    beforeEach(async () => {
        for (let i = 0; i < nUsers; i++) {
            await userService.createUser({
                username: `User${i}`,
                email: `user${i}@app.com`,
                name: `UserName${i}`,
                surname: `UserSurname${i}`,
                password: `Pass${i}`
            } as UserModel);
        }
        users = await userService.getUsers();
    });

    test('change password', async () => {
        const testId = users[0]._id;
        const oldPassword = `Pass${0}`;
        await service.changePassword(testId, oldPassword, "test");
        const user = await userService.findUserById(testId);        
        expect(user.password).not.toBe(oldPassword);
    });

});