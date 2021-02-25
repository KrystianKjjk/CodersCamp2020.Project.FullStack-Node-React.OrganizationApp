import UserModel from '../Models/User';
import UserService from '../Services/User';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';


export default class UserController {
    service: UserService;
    constructor(service: UserService) {
        this.service = service;
    }

    getUser = async (req: Request, res: Response) => {
        const id = new mongoose.Schema.Types.ObjectId(req.params.id);
        const user = await this.service.findUserById(id);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    }
    
    register = async (req: Request, res: Response) => {
        try{
            const user = new UserModel(req.body);
            user.validate();
            await this.service.createUser(user);
            return res.status(201).json({message: 'Register succeed'});
        } catch(err) {
            return res.status(500).json({message: err.message});
        };
    }
}