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

    //for password change old password has to be provided
    async changePassword(email, oldPassword, newPassword) {
        const user = await this.repository.getByEmail(email);
        if (!user) return;
        const passwordCheck = await bcrypt.compare(oldPassword, user.password);
        if (!passwordCheck) return;

        user.password = await bcrypt.hash(newPassword, 10);
        this.repository.updateById(user.id, user);
    }

    //for password reset old password does not have to be provided
    //authentication is assured by sending the reset link via email and user has to have email access to proceed
    async resetPassword(email, newPassword) {
        const user = await this.repository.getByEmail(email);
        user.password = await bcrypt.hash(newPassword, 10);
        this.repository.updateById(user.id, user);
    }
} 
