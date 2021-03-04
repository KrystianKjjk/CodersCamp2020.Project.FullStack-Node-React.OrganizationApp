import { Repository } from './Repository';
import * as mongoose from 'mongoose';

export default class TeamsRepository extends Repository { 
    async create(obj: object) {
        return this.model.create(obj);
    };

    async addUserToTeam(teamId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
        const updateQuery = {
            $push: {
                users: userId
            }
        }
        return await this.updateById(teamId, updateQuery);
    }

    async addMentorToTeam(teamId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const updateQuery = {
            mentor: mentorId
        }
        return await this.updateById(teamId, updateQuery);
    }

    async deleteMentorFromTeam(teamId: mongoose.Types.ObjectId) {
        const updateQuery = {
            mentor: null
        }
        return await this.updateById(teamId, updateQuery);
    }

    async deleteUserFromTeam(teamId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
        const updateQuery = {
            $pull: { 
            users: userId
            }
        }
        return await this.updateById(teamId, updateQuery);
    }
    
};
