import api from './api';
import { TeamInfo } from '../components/ManageTeam/ManageTeam';
import { User as UserData, userStatusDict } from  './getUsers';
import getTeamProjects from  './getTeamProjects';
import { User } from '../components/ManageTeam/ManageTeam';


interface TeamData {
    _id: string;
    mentor: {
        _id: string;
        name: string;
        surname: string;
    } | null;
    users: UserData[];
    projects: string[];
}

export default async function getTeam(id: string): Promise<TeamInfo> {
    const teamRes = await api.get<TeamData>('/teams/' + id);
    const team = teamRes.data;
    console.log(team);
    const projects = await getTeamProjects(id, team.mentor?._id);
    const teamInfo: TeamInfo = {
        id: team._id,
        mentor: {
            name: team?.mentor?.name ?? '---',
            surname: team?.mentor?.surname ?? '---',
        },
        users: [],
        projects,
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