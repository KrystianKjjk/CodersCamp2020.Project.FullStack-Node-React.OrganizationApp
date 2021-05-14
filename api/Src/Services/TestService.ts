import * as mongoose from 'mongoose'
import { Test } from '../Models/Section'
import SectionRepository from '../Repositories/SectionRepository'

class TestService {
  sectionRepository: SectionRepository
  constructor(sectionRepository: SectionRepository) {
    this.sectionRepository = sectionRepository
  }

  async addTest(sectionId: mongoose.Types.ObjectId, test: Test) {
    const updateQuery = {
      $push: {
        tests: test,
      },
    }
    return await this.sectionRepository.updateById(sectionId, updateQuery)
  }

  async updateTest(
    sectionId: mongoose.Types.ObjectId,
    testId: mongoose.Types.ObjectId,
    test: object,
  ) {
    const updateQueryFields = {}
    Object.keys(test).forEach((key) => {
      updateQueryFields[`tests.$.${key}`] = test[key]
    })

    const filterQuery = { 'tests._id': testId }
    const updateQuery = { $set: updateQueryFields }
    return await this.sectionRepository.updateByQuery(filterQuery, updateQuery)
  }

  async deleteTest(
    sectionId: mongoose.Types.ObjectId,
    testId: mongoose.Types.ObjectId,
  ) {
    const updateQuery = {
      $pull: {
        tests: {
          _id: testId,
        },
      },
    }
    return await this.sectionRepository.updateById(sectionId, updateQuery)
  }
}

export default TestService
