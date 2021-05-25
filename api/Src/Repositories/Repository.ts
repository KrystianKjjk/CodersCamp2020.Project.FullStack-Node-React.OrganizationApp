import * as mongoose from 'mongoose'

export type MongoModel = mongoose.Model<any & mongoose.Document>

export class Repository {
  model: MongoModel
  constructor(model: MongoModel) {
    this.model = model
    return this
  }

  async getAll() {
    return this.model.find({})
  }
  async getAllByCourse(courseId: String) {
    return this.model.find({ courseId })
  }
  async getById(id: mongoose.Types.ObjectId) {
    return this.model.findOne(id)
  }
  async create(obj: object) {
    this.model.create(obj)
  }
  async updateById(id: mongoose.Types.ObjectId, obj: object) {
    return await this.model.findByIdAndUpdate(id, obj, {
      useFindAndModify: false,
      upsert: false,
    })
  }
  async deleteById(id: mongoose.Types.ObjectId) {
    return this.model.findByIdAndDelete({ _id: id })
  }
  async save(doc: mongoose.Document) {
    return doc.save()
  }
}
