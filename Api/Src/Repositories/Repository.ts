import * as mongoose from 'mongoose';

export type MongoModel = mongoose.Model<any & mongoose.Document>;

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
        return this.model.findOne(id);
    };
    async create(obj: object) {
        this.model.create(obj);
    };
    async updateById(id: mongoose.ObjectId, obj: object) {
        this.model.updateOne({id}, obj);
    };
    async deleteById(id: mongoose.ObjectId) {
        this.model.deleteOne({id});
    };
}