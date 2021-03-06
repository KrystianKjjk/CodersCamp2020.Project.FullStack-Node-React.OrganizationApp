import * as mongoose from "mongoose";

import { Repository } from "./Repository";

export default class GradeRepository extends Repository {

    async getAll() {
        return this.model.find({}).populate('gradeSheetId');
    };
    async getById(id: mongoose.Types.ObjectId) {
        return this.model.findOne(id).populate( 'gradeSheetId');
    };
}
