import { Repository } from './Repository';
import * as mongoose from 'mongoose';

export default class TeamsRepository extends Repository { 
    async addUserToTeam(teamId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
        const updateQuery = {
            users: {
                $push: userId
            }
        }
        return await this.updateById(teamId, updateQuery);
    }

    async addMentorToTeam(teamId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const updateQuery = {
            mentor: {
                $push: mentorId
            }
        }
        return await this.updateById(teamId, updateQuery);
    }

    async setUsersToTeam(teamId: mongoose.Types.ObjectId, userIds: mongoose.Types.ObjectId[]) {
        const updateQuery = {
            users: userIds
        }
        return await this.updateById(teamId, updateQuery);
    }

    
};
