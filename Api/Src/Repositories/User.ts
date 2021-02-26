import { Repository } from './Repository';

export default class UserRepository extends Repository {
    async getByEmail(email: string) {
        return this.model.findOne({ email });
    }
};