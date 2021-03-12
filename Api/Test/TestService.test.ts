import * as mongoose from 'mongoose';
import { Section, Test, TestType } from '../Src/Models/Section';
import SectionRepository from '../Src/Repositories/SectionRepository';
import SectionService from '../Src/Services/SectionService';
import TestService from '../Src/Services/TestService';

type SectionDBModel = Section & {_id: mongoose.Types.ObjectId};

class TestSectionTestsRepository implements SectionRepository {
    private section: Array<Section> = [];
    model: any;

    async getAll(){
        return this.section;
    };

    async getById(id: mongoose.Types.ObjectId){
        return this.section.find(section => section._id === id);
    };

    async create(section: SectionDBModel){
        this.section = [...this.section, section];
    };

    async deleteById(id: mongoose.Types.ObjectId){
        this.section = this.section.filter(section => section._id !== id)
    };

    async updateById(id: mongoose.Types.ObjectId, section: SectionDBModel){
        const sectionIndex = this.section.findIndex(section => section._id === id);
        const sectionAfterUpdate = {...this.section[sectionIndex], ...section}
        this.section[sectionIndex] = sectionAfterUpdate;

        return sectionAfterUpdate;
    };
// tu trzeba to inaczej zrobic
    async updateByQuery(query: object, obj: object) {
        return await this.model.updateOne(query, obj, {useFindAndModify: false, upsert: false});
    };

    async addTest(sectionId: mongoose.Types.ObjectId, test: Test) {
        const sectionIndex = this.section.findIndex(section => section._id === sectionId)
        this.section[sectionIndex].test.push(test);

        return this.section[sectionIndex];
    }

};

describe("Test Section Service", () => {
    let testService: TestService;
    let sectionService: SectionService;

    const section = {
        _id: mongoose.Types.ObjectId(),
        name: "Typescript", 
        startDate: new Date(),
        endDate: new Date(),
        test: {
            _id: mongoose.Types.ObjectId(),
            testType: TestType.theoretical,
            testDate: new Date(),
            testUrl: "link do testu",
            testDescription: "test teoretyczny"
        }
    };

    beforeEach(() => {
        testService = new TestService(new TestSectionTestsRepository());
    })

    it("add new test to section", async () => {
        const simpleTest = {
            _id: mongoose.Types.ObjectId(),
            testType: TestType.sample,
            testDate: new Date(),
            testUrl: "link do testu",
            testDescription: "test przykładowy"
        };

        await testService.addTest(section._id, simpleTest);
        const fetchedSection = await sectionService.getSectionById(section._id);

        expect(fetchedSection.test[1]).toEqual(simpleTest);
    });

});
