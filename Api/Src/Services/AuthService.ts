import {JWT_TOKEN_EXPIRESIN} from "../../Constants";
import {UserModel} from "../Models/User";
import { UserType} from "../Models/User";
import * as mongoose from 'mongoose';
import UserRepository from "../Repositories/User";
import * as bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');

type User = UserModel & mongoose.Document;

export default class AuthService {
    private saltRounds: number = 10;

    constructor(private repository: UserRepository) { }

    generateToken = (user: User): string => {
        return jwt.sign(
            { _id: user._id, type: user.type },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: JWT_TOKEN_EXPIRESIN });
    };

    findUser = async (email: string) => {
        return this.repository.getByEmail(email);
    }

    hashPassword = async (user: User) => {
        return await bcrypt.hash(user.password, this.saltRounds);
    }

    checkPassword = async (password: string, user: User) => {
       return await bcrypt.compare(password, user.password)
    }

    saveUser = async (user: User) => {
       return await this.repository.create(user);
    }

    getTokenData = (token: string) => {
        return jwt.decode(token);
    };

    isAdmin = (token: string): boolean => {
        return this.getTokenData(token).type === UserType.Admin;
    };

    isMentor = (token: string): boolean => {
        return this.getTokenData(token).type === UserType.Mentor;
    };

    isParticipant = (token: string): boolean => {
        return this.getTokenData(token).type === UserType.Participant;
    };

    isCandidate = (token: string): boolean => {
        return this.getTokenData(token).type === UserType.Candidate;
    };

    isUserWithID = (token: string, _id: mongoose.Types.ObjectId): boolean => {
        return this.getTokenData(token)._id === _id;
    };

    isUserMentor = (token: string, _id: mongoose.Types.ObjectId): boolean => {
        return this.isUserWithID(token, _id) && this.isMentor(token);
    };

    isMentorReviewer = (token, projectID: string) => {
        //WILL BE IMPLEMENTED
    };
}
