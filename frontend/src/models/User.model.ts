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

export interface UserData {
    _id: string;
    name: string;
    surname: string;
    status: UserStatus;
    type: UserType;
}

export interface User {
    id: string;
    name: string;
    surname: string;
    status: string;
    type: string;
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