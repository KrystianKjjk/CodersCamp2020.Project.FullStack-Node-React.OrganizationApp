import { Repository } from './Repository';
import * as mongoose from 'mongoose';

export default class ProjectRepository extends Repository { 
    async deleteById(id: mongoose.Types.ObjectId) {
        return this.model.deleteOne({_id: id});
    };

    async create(obj: object) {
        return this.model.create(obj);
    };

    async updateById(id: mongoose.Types.ObjectId, obj: object) {
        return this.model.findByIdAndUpdate(id, obj, {new: true, useFindAndModify: false, upsert: false});
    };
};