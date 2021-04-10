export enum UserType {
    Candidate,
    Participant,
    Mentor,
    Admin,
};

export enum UserStatus {
    Active,
    Resigned,
    Archived,
};

export interface Grade {
    _id: string;
    sectionId?: string;
    testPoints?: number;
    testMaxPoints?: number;
    taskPoints?: number;
    taskMaxPoints?: number;
    projectPoints?: number;
}

export interface UserData {
    _id: string;
    name: string;
    surname: string;
    status: UserStatus;
    type: UserType;
    grades: Grade[];
}

export interface User {
    id: string;
    name: string;
    surname: string;
    status?: string;
    type?: string;
    grades?: Grade[];
    averageGrade?: number;
    maxGrade?: number;
}

export interface IUser {
    name: string,
    surname: string,
    email: string,
    type: UserType,
    status: UserStatus,
};

export interface IGrade {
    _id: string,
    sectionId: string,
    testPoints: number,
    testMaxPoints: number,
    taskPoints: number,
    taskMaxPoints: number,
    projectPoints: number
}

export const userStatusDict = {
    [UserStatus.Active]: 'Active',
    [UserStatus.Archived]: 'Archived',
    [UserStatus.Resigned]: 'Resigned',
}

export const userTypeDict = {
    [UserType.Candidate]: 'Candidate',
    [UserType.Participant]: 'Participant',
    [UserType.Mentor]: 'Mentor',
    [UserType.Admin]: 'Admin',
}
