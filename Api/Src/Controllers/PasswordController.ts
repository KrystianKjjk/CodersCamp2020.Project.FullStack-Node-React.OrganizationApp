import UserModel from '../Models/User';
import PasswordService from '../Services/Password';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

export default class PasswordController{
    service: PasswordService

    constructor(service: PasswordService){
        this.service = service;
    }

    changePassword = (req: Request, res: Response) => {
        
    }

    resetPassword = (req: Request, res: Response) => {
        
    }

}