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
interface User {
    _id: string;
    name: string;
    surname: string;
    status: UserStatus;
    type: UserType;
}
const userStatusDict = {
    [UserStatus.Active]: 'Active',
    [UserStatus.Archived]: 'Archived',
    [UserStatus.Resigned]: 'Resigned',
}
const userTypeDict = {
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