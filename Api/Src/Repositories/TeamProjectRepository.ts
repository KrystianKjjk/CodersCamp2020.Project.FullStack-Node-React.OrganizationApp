import { Repository } from "./Repository";
import * as mongoose from 'mongoose'

export default class TeamProjectRepository extends Repository {
    async findByTeamId(teamId: mongoose.Types.ObjectId){
        return this.model.find({teamId});
    }
}