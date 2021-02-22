import * as mongoose from 'mongoose';
// import {Grade} from './Grade' - add grade when create grades model

export enum UserType {
    Candidate,
    Participant,
    Mentor, 
    Admin,
};

export enum UserStatus {
    Active, 
    Deleted, 
    Archived,
};

export interface UserModel {
    username: string,
    name: string,
    surname: string,
    email: string,
    type: UserType,
    password: string,
    status: UserStatus,
    // grades: Grade[], - add grade when create grades model
};

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true, 
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
    },
    type: {
        type: Number,
        default: 0,
    },
    password:  {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0,
    },
  }, {timestamps: true});

  export default mongoose.model<UserModel & mongoose.Document>('User', UserSchema);
