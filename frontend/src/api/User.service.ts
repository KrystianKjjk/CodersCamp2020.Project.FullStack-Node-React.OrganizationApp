import { TeamService } from '.';
import BaseService from '../app/baseService';
import { userStatusDict, userTypeDict, User, UserData } from '../models/User.model';


export default class UserService {
    
    constructor(
        private api = new BaseService(),
        private teamsApi = new TeamService()
    ) { };

    getUsers = async (): Promise<User[]> => {
        const response = await this.api.get('/users');
        return response.data.map( (user: UserData) => ({
            ...user,
            id: user._id,
            type: userTypeDict[user.type],
            status: userStatusDict[user.status],
        }) );
    }

    getUsersOfType = async (type: string): Promise<User[]> => {
        const users = await this.getUsers();
        return users.filter((user: User) => user.type === type);
    }

    getParticipantsNotInTeam = async (): Promise<User[]> => {
        const users = await this.getUsersOfType('Participant');
        const teams = await this.teamsApi.getTeams();
        const result = users.filter(user => {
            return teams.every( team => !(team.users) || team.users.every(u => {
                if(u._id !== user.id)
                    console.log('asd');
                return u._id !== user.id;
            }) );
        });
        console.log({result});
        return result;
    }

}