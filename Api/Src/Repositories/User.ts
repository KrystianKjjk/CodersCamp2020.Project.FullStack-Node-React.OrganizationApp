import { Repository } from './Repository';

export default class User extends Repository {
    async getByEmail(email: string) {
        return this.model.find({ email });
    }
};