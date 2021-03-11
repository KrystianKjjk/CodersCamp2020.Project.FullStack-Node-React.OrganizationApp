import UserModel from '../Models/User';
import UserService from '../Services/User';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

interface MailingService{
    sendMail: Function
}
class TokenService {
    secret: string;    
    constructor(secret: string){        
        this.secret = secret;
    }
    generateToken(payload: object, expiresIn: string = '1h') {
        return jwt.sign(payload, this.secret, { expiresIn })
    }
}

export default class UserController {
    userService: UserService;
    authService: TokenService;
    mailingService: MailingService;

    constructor(userService: UserService,  mailingService: MailingService, authService = new TokenService('secret'),) {
        this.userService = userService;
        this.authService = authService;
        this.mailingService = mailingService;
    }

    getUser = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const user = await this.userService.findUserById(id);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    }

    getAllUsers = async (req: Request, res: Response) => {
        const users = await this.userService.getUsers();
        res.status(200).json(users);
    }

    updateUser = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const user = await this.userService.updateUser(id, req.body);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json({message: 'User updated'});
    }

    deleteUser = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const user = await this.userService.deleteUser(id);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json({message: 'User deleted'});
    }
    
    register = async (req: Request, res: Response) => {
        try {
            const user = new UserModel(req.body);
            await user.validate();
            await this.userService.createUser(user);
            res.status(201).json({message: 'Register succeed'});

            //Mailing the user
            this.mailingService.sendMail({
                from: 'coderscamp@fastmail.com',
                to: user.email,
                subject: 'Welcome to CodersCamp',
                template: 'welcomeEmail',
                context:{
                    userName: user.name,
                    email: user.email,
                    appLink: process.env.PAGE_URL || "https://coderscamp.edu.pl/"
                }
            });

        } catch(err) {
            if(err.name === 'ValidationError')
                return res.status(400).json({message: err.message})
            res.status(500).json({message: err.message});
        }
    }

    logIn = async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = await this.userService.logIn(email, password);
        if(user === null) return res.status(200).json({message: 'Log in failed'});
        const token = this.authService.generateToken({
            id: user._id,
            type: user.type
        });
        res.status(200).json({token}); 
    }

}