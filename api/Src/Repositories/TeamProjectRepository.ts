import { Repository } from "./Repository";
import * as mongoose from 'mongoose'
import { TeamProject } from "../Models/TeamProject";

export default class TeamProjectRepository extends Repository {
    async getAll(){
      return this.model.find({}).populate('teamId').populate('parentProjectId');
    }

    async findByTeamId(teamId: mongoose.Types.ObjectId){
        return this.model.find({teamId});
    }

    async updateForTeam(id: mongoose.Types.ObjectId, teamId: mongoose.Types.ObjectId, teamProject: object) {
      return this.model.updateOne({_id: id, teamId}, teamProject);
    }

    async deleteByIdForTeam(id: mongoose.Types.ObjectId, teamId: mongoose.Types.ObjectId) {
      return this.model.deleteOne({_id: id, teamId});
    }
}