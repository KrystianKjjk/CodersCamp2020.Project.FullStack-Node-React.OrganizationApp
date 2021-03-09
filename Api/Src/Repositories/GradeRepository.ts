import * as mongoose from "mongoose";

import { Repository } from "./Repository";

export default class GradeRepository extends Repository {

    async getAll() {
        return this.model.find({}).populate('sectionId');
    };
    async getById(id: mongoose.Types.ObjectId) {
        return this.model.findOne(id).populate( 'sectionId');
    };
    async updateById(id: mongoose.Types.ObjectId, obj: object) {
        return this.model.findByIdAndUpdate(id, obj, {useFindAndModify: false, upsert: false, new: true});
    };
}
