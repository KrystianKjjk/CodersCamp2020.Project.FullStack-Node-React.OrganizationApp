import * as mongoose from 'mongoose';

export enum UserType {
    Participant,
    Mentor, 
    Admin,
};

export interface UserModel {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    userType: UserType,
    password: string
};

const UserSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true,
        index: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true, 
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
    },
    userType: {
        type: Number,
        default: 0,
    },
    password:  {
        type: String,
        required: true,
    },
  }, {timestamps: true});

  export default mongoose.model<UserModel & mongoose.Document>('User', UserSchema);
