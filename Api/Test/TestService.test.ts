import * as mongoose from 'mongoose';
import { Section, Test, TestType } from '../Src/Models/Section';
import SectionRepository from '../Src/Repositories/SectionRepository';
import SectionService from '../Src/Services/SectionService';
import SectionSchema from '../Src/Models/Section';
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

    async updateById(id: mongoose.Types.ObjectId, testQuery: object){
        const sectionIndex = this.section.findIndex(section => section._id === id);
        if (testQuery["$push"]) {
            this.section[sectionIndex].test.push(testQuery["$push"].test);
        } else if (testQuery["$pull"]) {
            const updatedSection = this.section[sectionIndex];
            updatedSection.test = updatedSection.test.filter(test => test._id !== testQuery["$pull"].test._id);
            this.section[sectionIndex] = updatedSection;
        }
        return this.section[sectionIndex];
    };

    async updateByQuery(query: object, obj: object) {
        const testId = query['test._id'];
        const changes = {};
        Object.keys(obj['$set']).forEach(key => {
            const fieldName = key.split(".$.")[1];
            changes[fieldName] = obj['$set'][key];
        });
        this.section = this.section.map(section => {
            return {
                ...section,
                test: section.test.map(test => {
                    return test._id === testId ? {...test, ...changes} : test;    
                })
            }
        })
    };

};

describe("Test Section Service", () => {
    let testService: TestService;
    let sectionService: SectionService;

    const section = {
        _id: mongoose.Types.ObjectId(),
        name: "Typescript", 
        startDate: new Date(),
        endDate: new Date(),
        test: [{
            _id: mongoose.Types.ObjectId(),
            testType: TestType.theoretical,
            testDate: new Date(),
            testUrl: "link do testu",
            testDescription: "test teoretyczny"
        }]
    };

    beforeEach(() => {
        const testRepo = new TestSectionTestsRepository();
        testService = new TestService(testRepo);
        sectionService = new SectionService(testRepo);
    })

    it("adds new test to section", async () => {
        const simpleTest = {
            _id: mongoose.Types.ObjectId(),
            testType: TestType.sample,
            testDate: new Date(),
            testUrl: "link do testu",
            testDescription: "test przykładowy"
        };
        await sectionService.createSection(section as any);
        await testService.addTest(section._id, simpleTest);
        const fetchedSection = await sectionService.getSectionById(section._id);
        expect(fetchedSection.test[1]).toEqual(simpleTest);
    });

    it("deletes test", async () => {
        await sectionService.createSection(section as any);
        const fetchedSection = await sectionService.getSectionById(section._id);
        const beforeDeleteLength = fetchedSection.test.length;
        const testId = fetchedSection.test[0]._id;
        await testService.deleteTest(section._id, testId);
        expect(fetchedSection.test).toHaveLength(beforeDeleteLength - 1);
    });

    it("updates test", async () => {
        const newTest = {
            testType: TestType.practical,
            testUrl: "nowy link",
            testDescription: "test na ktory chce zmienic inny test"
        };

        await sectionService.createSection(section as any);
        const fetchedSection = await sectionService.getSectionById(section._id);
        await testService.updateTest(section._id, fetchedSection.test[0]._id, newTest);
        const fetchedSectionAfterUpdate = await sectionService.getSectionById(section._id);
        expect(fetchedSectionAfterUpdate.test[0].testType).toEqual(newTest.testType);
        expect(fetchedSectionAfterUpdate.test[0].testUrl).toEqual(newTest.testUrl);
        expect(fetchedSectionAfterUpdate.test[0].testDescription).toEqual(newTest.testDescription);
    });

});
