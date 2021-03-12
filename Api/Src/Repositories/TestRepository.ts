import { Repository } from './Repository';
import * as mongoose from 'mongoose';

export default class TestRepository extends Repository {
    // async getAll() {
    //     return this.model.find({}).populate('users').populate('mentor');
    // };

    // async getById(id: mongoose.Types.ObjectId) {
    //     return this.model.findOne(id).populate('users').populate('mentor');
    // };

    // async create(obj: object) {
    //     return this.model.create(obj);
    // };

    async addTest(sectionId: mongoose.Types.ObjectId, test: object) {
        const updateQuery = {
            $push: {
                test: {
                    type: test.type,
	                date: test.date,
	                url: test.url,
                }
            }
        }

        return await this.updateById(sectionId, updateQuery);
    }

    async deleteTest(sectionId: mongoose.Types.ObjectId, testId: mongoose.Types.ObjectId) {
        const updateQuery = {
            $pull: { 
                test: testId
            }
        }
        return await this.updateById(sectionId, updateQuery);
    }
};