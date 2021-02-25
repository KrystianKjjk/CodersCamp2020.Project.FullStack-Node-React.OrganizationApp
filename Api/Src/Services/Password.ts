import User from '../Models/User'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

interface UserRepository{
    getByEmail(email),  
    updateById(id:string, user:object)
}

export default class PasswordService{
    repository: UserRepository;

    constructor (repository) {
        this.repository = repository;
    }

    async changePassword(email, oldPassword, newPassword) {
        const user = await this.repository.getByEmail(email);
        if (!user) return;
        const passwordCheck = await bcrypt.compare(oldPassword, user.password);
        if (!passwordCheck) return;

        user.password = await bcrypt.hash(newPassword, 10);
        this.repository.updateById(user.id, user);
    }

    async resetPassword(email, newPassword) {
        const user = await this.repository.getByEmail(email);
        user.password = await bcrypt.hash(newPassword, 10);
        this.repository.updateById(user.id, user);
    }
} 
