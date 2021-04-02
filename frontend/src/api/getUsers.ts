import api from './api';


enum UserType {
    Candidate,
    Participant,
    Mentor,
    Admin,
};
enum UserStatus {
    Active,
    Resigned,
    Archived,
};
export interface User {
    _id: string;
    name: string;
    surname: string;
    status: UserStatus;
    type: UserType;
    grades: {
        _id: string;
        sectionId?: string;
        testPoints?: number;
        testMaxPoints?: number;
        taskPoints?: number;
        taskMaxPoints?: number;
        projectPoints?: number;
    }[];
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

export default async function getUsers(): Promise<any[]> {
    const response = await api.get<User[]>('/users');
    return response.data.map( user => ({
        ...user,
        id: user._id,
        type: userTypeDict[user.type],
        status: userStatusDict[user.status],
    }) );
}