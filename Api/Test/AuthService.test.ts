import AuthService from '../Src/Services/AuthService';
import UserRepository from '../Src/Repositories/User';
import { UserModel } from '../Src/Models/User';
import { Document, Types } from 'mongoose';
import User from '../Src/Models/User';
import * as mongoose from 'mongoose';

type UserType = UserModel & mongoose.Document;
process.env.JWT_PRIVATE_KEY = 'thisisprivatekey';

class TestRepository extends UserRepository {
    users: Array<UserType>;

    constructor() {
        super(User);
        this.users = [];
    };

    async getByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }

    async create(user: UserModel) {
        const newUser = new this.model(user) as UserModel & Document;
        this.users.push(newUser);
    };

}

const repo = new TestRepository();
const service = new AuthService(repo);


describe('Test AuthService ', () => {
    let user = {
        name: `Test`,
        surname: `Test`,
        email: `test@test.pl`,
        password: `Test123!`
    };

    (async () => {
        const password = await service.hashPassword(user as UserType);
        let user2 = Object.assign({}, user);
        user2.password = password;
        await service.saveUser(user2 as UserType);
    })();

    test(`generate token`, () => {
        expect(typeof service.generateToken(user as UserType)).toBe('string');
    });
    test(`find user`, async () => {
        expect(await service.findUser(`test@test.pl`)).toBe(repo.users[0]);
    });
    test(`hash password`, async () => {
        expect(typeof await service.hashPassword(user as UserType)).toBe('string');
    });
    test(`check password`, async () => {
        expect(await service.checkPassword(user.password, repo.users[0])).toBe(true);
    });
    test(`is admin`, async () => {
        let token = service.generateToken(repo.users[0]);
        expect(await service.isAdmin(token)).toBe(false);
    });
    test(`is mentor`, async () => {
        let token = service.generateToken(repo.users[0]);
        expect(await service.isMentor(token)).toBe(false);
    });
    test(`is participant`, async () => {
        let token = service.generateToken(repo.users[0]);
        expect(await service.isParticipant(token)).toBe(false);
    });
    test(`is candidate`, async () => {
        let token = service.generateToken(repo.users[0]);
        console.log(repo.users[0]);
        expect(await service.isCandidate(token)).toBe(true);
    });

});
