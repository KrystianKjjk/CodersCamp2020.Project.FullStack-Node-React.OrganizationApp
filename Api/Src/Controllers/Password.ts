import PasswordService from '../Services/Password';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';


interface MailingService{
    sendMail: Function
}

export default class PasswordController{
    mailingService: MailingService;
    passwordService: PasswordService

    constructor(mailingService, passwordService){
        this.mailingService = mailingService;
        this.passwordService = passwordService;
    }

    requestPasswordReset = async (req:Request, res:Response) => {
        const userId = new mongoose.Types.ObjectId(req.body.id);
        try{
            const userEmail = await this.passwordService.requestPasswordReset(userId);
            this.mailingService.sendMail({
                from: 'coderscamp@fastmail.com',
                to: userEmail,
                subject: 'CodersCamp password reset',
                text: 'password to be changed'
            });
            res.status(200).json({'message': `Password reset request sent to ${userEmail}`});
        }
        catch(err){
            console.log(err)
            res.status(500).json({'message': `Password reset request not sent`});
        }   
    }

    resetPassword = async (req:Request, res:Response) => {
        const userId = new mongoose.Types.ObjectId(req.body.id);
        const token = req.body.token;
        const password = req.body.password;
        try{
            const passwordReset = await this.passwordService.resetPassword(userId, token, password);
            res.status(200).json({message: 'Password changed'});
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: `Password reset request not sent`});
        }   
    }

    changePassword = async (req:Request, res:Response) => {
        const userId = new mongoose.Types.ObjectId(req.body.id);
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        try{
            const passwordReset = await this.passwordService.changePassword(userId, oldPassword, newPassword);
            res.status(200).json({message: 'Password changed'});
        }
        catch(err){
            console.log(err)
            res.status(500).json({message: `Password not changed`});
        }  
    }  
}