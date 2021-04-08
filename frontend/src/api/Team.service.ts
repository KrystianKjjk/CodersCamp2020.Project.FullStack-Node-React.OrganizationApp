import BaseService from '../app/baseService';
import { TeamData, Team, TeamInfo } from '../models/Team.model';
import { CourseData } from '../models/Course.model';
import { calcUserProjectGrade, calcUserTasksGrade, calcUserTestsGrade, SheetService, TeamProjectService } from '.';
import { User, UserData, userStatusDict } from '../models';


export default class TeamService {
    
    constructor(
        private api = new BaseService(),
        private teamProjectApi = new TeamProjectService(),
        private sheetApi = new SheetService()
    ) { };

    getTeams = async (): Promise<Team[]> => {
        const coursesRes = await this.api.get('/courses');
        const courses = coursesRes.data as CourseData[];
        let allTeams: Team[] = [];
        for (let i in courses) {
            const teams = (await this.api.get('/teams')).data as TeamData[];
            const newData = teams.map( team => ({
                id: team._id,
                name: team?.mentor?.name ?? '---',
                surname: team?.mentor?.surname ?? '---',
                courseName: courses[i].name,
            }) );
            allTeams = allTeams.concat(newData);
        }

        return allTeams;
    };

    getTeam = async (id: string): Promise<TeamInfo> => {
        const teamRes = await this.api.get('/teams/' + id);
        const team = teamRes.data as TeamData;
        console.log(team);
        const projects = await this.teamProjectApi.getTeamProjects(id, team.mentor?._id);
        const sheets = await this.sheetApi.getMentorSheets(team.mentor?._id);
        const teamInfo: TeamInfo = {
            id: team._id,
            mentor: {
                id: team?.mentor?._id ?? '---',
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
    };

    setMentor = async (teamId: string, mentorId: string) => {
        const reqBody = {
            mentor: mentorId
        }
        await this.api.patch(`/teams/${teamId}`, reqBody);
    }

}