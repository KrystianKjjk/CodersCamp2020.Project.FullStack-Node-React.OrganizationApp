import Container from '../Container';
import { UserModel } from '../Src/Models/User';
import UserRepository from '../Src/Repositories/User';
import appContainer from '../CreateContainer';

const userRepo: UserRepository = appContainer.UserRepository;
const nUsers = 10;
for (let i = 0; i < nUsers; i++) {
    userRepo.create({
        username: `User${i}`,
        email: `user${i}@app.com`,
        name: `UserName${i}`,
        surname: `UserSurname${i}`,
        password: `Pass${i}`
    } as UserModel);
}
console.log('All users: ', userRepo.getAll());