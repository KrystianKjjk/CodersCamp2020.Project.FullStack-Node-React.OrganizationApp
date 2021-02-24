import UserService from '../Src/Services/User';
import UserRepository from '../Src/Repositories/User';
import { UserModel } from '../Src/Models/User';
import UserDbModel from '../Src/Models/User';
import { Document, ObjectId } from 'mongoose';

class TestRepository extends UserRepository {
    private users: Array<UserModel & Document>;
    constructor() {
        super(UserDbModel);
        this.users = [];
    };

    async clear() {
        this.users = [];
    };

    async getAll() {
        return this.users;
    };

    async getById(id: ObjectId) {
        return this.users.find(user => user._id === id);
    };

    async create(user: UserModel) {
        const newUser = new this.model(user) as UserModel & Document;
        this.users[newUser._id] = newUser;
    };

    async updateById(id: ObjectId, props: object) {
        const index = this.users.findIndex(user => user._id === id);
        Object.assign(this.users[index], props)
    };

    async deleteById(id: ObjectId) {
        this.users.filter(user => user._id !== id)
    };
    
}

const testRepo = new TestRepository()
const service = new UserService(testRepo);

describe('Test UserService ', async () => {
    const nUsers = 10;
    const users = await service.getUsers();
    
    test(`create ${nUsers} users`, async () => {
        for (let i = 0; i < nUsers; i++) {
            await service.createUser({
                username: `User${i}`,
                email: `user${i}@app.com`,
                name: `UserName${i}`,
                surname: `UserSurname${i}`,
                password: `Pass${i}`
            } as UserModel);
        }
        expect(users).toHaveLength(nUsers);
    });
    
    test('find user by id', async () => {
        expect(await service.findUserById(users[0]._id)).toEqual(users[0]);
    });

    test('update user', async () => {
        const newSurname = 'newSurname';
        await service.updateUser(users[0]._id, {surname: newSurname});
        expect(users[0].surname).toBe(newSurname);
    });

    test('log in', async () => {
        const user = users[0];
        const loggedUser = await service.logIn(user.email, 'Pass0');
        expect(loggedUser).toEqual(user);
        const notLoggedUser = await service.logIn(user.email, 'WrongPassword');
        expect(notLoggedUser).toBeNull();
    });

    test('delete user', async () => {
        const deletedId = users[0]._id
        await service.deleteUser(deletedId);
        expect(users.findIndex((user: Document) => user._id === deletedId)).toBe(false);
    });

});