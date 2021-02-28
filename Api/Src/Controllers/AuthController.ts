import * as express from 'express';
import AuthService from "../Services/AuthService";
import User from "../Models/User";
const bcrypt = require('bcrypt');

export default class AuthController {

    constructor(private service: AuthService) {}

    register = async (req: express.Request, res: express.Response, next?: express.NextFunction) => {
        try {

            let user = await this.service.findUser(req.body.email);
            if(user) return res.status(400).json({message: 'Email has already been taken.'});
            req.body.password = await this.service.hashPassword(req.body);
            user = new User(req.body);
            await user.validate();
            await this.service.saveUser(user);
            res.status(201).json({message: 'Register succeed'});
        }
        catch(error) {
            if(error.name === 'ValidationError') return res.status(400).json({message: error.message})
            return res.status(500).json({message: 'Internal server error.'});
        }
    }

    login = async (req: express.Request, res: express.Response, next?: express.NextFunction) => {

        try {
            let user = await this.service.findUser(req.body.email);
            if (!user) return res.status(401).json({message: 'Invalid email or password.'});
            const result = await this.service.checkPassword(req.body.password, user);
            if (!result) return res.status(401).json({message: 'Invalid email or password.'});
            const token = this.service.generateToken(user);
            res.header('x-auth-token', token).status(200).json({message: 'Logged in correctly.'});
        } catch {
            return res.status(500).json({message: 'Internal server error.'});
        }
    }
};
