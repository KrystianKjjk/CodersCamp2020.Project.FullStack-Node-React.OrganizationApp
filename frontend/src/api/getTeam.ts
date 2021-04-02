import api from './api';
import { TeamInfo } from '../components/ManageTeam/ManageTeam';
import { User as UserData, userStatusDict } from  './getUsers';
import getTeamProjects from  './getTeamProjects';
import { User } from '../components/ManageTeam/ManageTeam';
import getMentorSheets from './getMentorSheets';
import { calcUserTasksGrade, calcUserTestsGrade, calcUserProjectGrade } from './gradesProcessing';


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
    const sheets = await getMentorSheets(team.mentor?._id);
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
    teamInfo.users = team.users.map((user: UserData): User => {
        const [tasksPoints, tasksMaxPoints] = calcUserTasksGrade(user);
        const [testsPoints, testsMaxPoints] = calcUserTestsGrade(user);
        let [projectsPoints, projectsMaxPoints] = [0, 0];
        sheets?.forEach(sheet => {
            const grade = calcUserProjectGrade(sheet, user._id);
            if(grade) {
                projectsPoints += grade[0];
                projectsMaxPoints += grade[1];
            }
        });
        const averageGrade = 3 * tasksPoints + 2 * testsPoints + 5 * projectsPoints;
        const maxGrade = 3 * tasksMaxPoints + 2 * testsMaxPoints + 5 * projectsMaxPoints;
        return {
            id: user._id,
            name: user.name,
            surname: user.surname,
            status: userStatusDict[user.status],
            averageGrade,
            maxGrade,
        }
    });
    console.log(teamInfo);
    return teamInfo;
}