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

} 
