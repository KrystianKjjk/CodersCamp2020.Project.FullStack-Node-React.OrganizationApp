import api from './api';
import { TeamInfo } from '../components/ManageTeam/ManageTeam';
import { User as UserData, userStatusDict } from  './getUsers';
import { User } from '../components/ManageTeam/ManageTeam';


interface TeamData {
    _id: string;
    mentor: {
        name: string;
        surname: string;
    } | null;
    users: UserData[];
    projects: string[];
}

export default async function getTeam(authToken: string, id: string): Promise<TeamInfo> {
    const config = {
        headers: {
            'x-auth-token': authToken,
        }
    };
    
    const teamRes = await api.get<TeamData>('/teams/' + id, config);
    const team = teamRes.data;
    const teamInfo: TeamInfo = {
        id: team._id,
        mentor: {
            name: team?.mentor?.name ?? '---',
            surname: team?.mentor?.surname ?? '---',
        },
        users: [],
        projects: [],
        teamAvgGrade: 100,
        maxPoints: 99,
    }
    teamInfo.users = team.users.map((user: UserData): User => ({
        id: user._id,
        name: user.name,
        surname: user.surname,
        status: userStatusDict[user.status],
        averageGrade: 0
    }));
    console.log(teamInfo);
    return teamInfo;
}