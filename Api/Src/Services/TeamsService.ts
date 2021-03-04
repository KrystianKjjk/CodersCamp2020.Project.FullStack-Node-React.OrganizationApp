import * as mongoose from 'mongoose';
import {Teams} from '../Models/Teams';
import TeamsRepository from '../Repositories/TeamsRepository';

class TeamsService {
    teamsRepository: TeamsRepository;
    constructor(teamsRepository: TeamsRepository) {
        this.teamsRepository = teamsRepository;
    };

    async getTeams() {
        return this.teamsRepository.getAll();
    };

    async findTeamById(id: mongoose.Types.ObjectId) {
        return this.teamsRepository.getById(id);
    };

    async createTeam(team: Teams & mongoose.Document<Teams>) {
        return this.teamsRepository.create(team);
    }

    async updateTeam(id: mongoose.Types.ObjectId, team: Teams & mongoose.Document<Teams>) {
        return this.teamsRepository.updateById(id, team);
      };
    
    async deleteTeam(id: mongoose.Types.ObjectId) {
        return this.teamsRepository.deleteById(id);
      }

    async addUserToTeam(teamId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
        return await this.teamsRepository.addUserToTeam(teamId, userId);
    }

    async addMentorToTeam(teamId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        return await this.teamsRepository.addMentorToTeam(teamId, mentorId);
    }

    async setUsersToTeam(teamId: mongoose.Types.ObjectId, userIds: mongoose.Types.ObjectId[]) {
        return await this.teamsRepository.setUsersToTeam(teamId, userIds);
    }

    async deleteMentorFromTeam(teamId: mongoose.Types.ObjectId) {
        return await this.teamsRepository.deleteMentorFromTeam(teamId);
    }
}

export default TeamsService;