import BaseService from '../app/baseService';
import { TeamData, Team } from '../models/Team.model';
import { CourseData } from '../models/Course.model';


export default class TeamService {
    
    constructor(private api = new BaseService()) { };

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
    }

}