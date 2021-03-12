import * as mongoose from 'mongoose';
import {Test} from '../Models/Team';
import TestRepository from '../Repositories/TestRepository';

class TestService {
    testRepository: TestRepository;
    constructor(testRepository: TestRepository) {
        this.testRepository = testRepository;
    };

    async addTest(sectionId: mongoose.Types.ObjectId, test: object) {
        return this.testRepository.addTest(sectionId, test);
    }


    async deleteTest(sectionId: mongoose.Types.ObjectId, testId: mongoose.Types.ObjectId) {
        return this.testRepository.deleteTest(sectionId, testId);
    }

}

export default TestService;