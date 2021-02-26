import * as mongoose from 'mongoose';

export type MongoModel = mongoose.Model<mongoose.Document>;

export class Repository {
    model: MongoModel;
    constructor(model: MongoModel) {
        this.model = model;
        return this;
    };

    async getAll() {
        return this.model.find({});
    };
    async getById(id: mongoose.ObjectId) {
        return this.model.find(id);
    };
    async create(obj: object) {
        return this.model.create(obj);
    };
    async updateById(id: mongoose.ObjectId, obj: object) {
        return this.model.updateOne({id}, obj);
    };
    async deleteById(id: mongoose.ObjectId) {
        return this.model.deleteOne({id});
    };
}