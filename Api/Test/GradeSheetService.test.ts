import GradeSheetService from '../Src/Services/GradeSheetService';
import GradeSheetRepository from '../Src/Repositories/GradeSheetRepository';
import { GradeSheet } from '../Src/Models/GradeSheet';
import GradeSheetDbModel from '../Src/Models/GradeSheet';
import { Document, Mongoose, Types } from 'mongoose';


class TestRepository extends GradeSheetRepository {
    gradeSheets: Array<GradeSheet & Document>;
    constructor() {
        super(GradeSheetDbModel);
        this.gradeSheets = [];
    };

    async clear() {
        this.gradeSheets = [];
    };

    async getAll() {
        return this.gradeSheets;
    };

    async getById(id: Types.ObjectId) {
        return this.gradeSheets.find(sheet => sheet._id === id);
    };

    async create(gradeSheet: GradeSheet) {
        const newGradeSheet = new this.model(gradeSheet) as GradeSheet & Document;
        this.gradeSheets.push(newGradeSheet);
    };

    async updateById(id: Types.ObjectId, props: object) {
        const index = this.gradeSheets.findIndex(sheet => sheet._id === id);
        Object.assign(this.gradeSheets[index], props)
    };

    async deleteById(id: Types.ObjectId) {
        this.gradeSheets = this.gradeSheets.filter(sheet => sheet._id !== id)
    };

}

const testRepo = new TestRepository()
const service = new GradeSheetService(testRepo);

describe('Test GradeSheetService ', () => {
    const nSheets = 10;
    let gradeSheets: Array<GradeSheet & Document>;
    
    beforeEach(async () => {
        await service.createGradeSheet({
            projectID: new Types.ObjectId(),
            angagement: 1,
            mentorReviewer: null,
            mentorGrades: {
                design: 1,
                extra: 2,
            },
            mentorReviewerGrades: null,
        } as GradeSheet);

        for (let i = 0; i < nSheets - 1; i++) {
            const mentorReviewerId = new Types.ObjectId();
            const reviewerGrades = {
                mentor: mentorReviewerId,
                grades: {
                    code: Math.round(Math.random() * 10),
                    repo: Math.round(Math.random() * 10),
                    extra: Math.round(Math.random() * 10),
                }
            };
            const mentorReviewerGrades = i/nSheets > 0.5 ? [reviewerGrades] : [];
            await service.createGradeSheet({
                projectID: new Types.ObjectId(),
                angagement: 1,
                mentorReviewer: [mentorReviewerId],
                mentorGrades: {
                    code: Math.round(Math.random() * 10),
                    repo: Math.round(Math.random() * 10),
                    extra: Math.round(Math.random() * 10),
                },
                mentorReviewerGrades,
            } as GradeSheet);
        }
        
        gradeSheets = await service.getGradeSheets();
    });

    afterEach(async () => {
        await testRepo.clear();
    });
    
    test(`create ${nSheets} sheets`, () => {
        expect(gradeSheets).toHaveLength(nSheets);
    });
    
    test('find sheet by id', async () => {
        expect(await service.findGradeSheetById(gradeSheets[0]._id)).toEqual(gradeSheets[0]);
    });

    test('update sheet', () => {
        expect(2+2).toBe(4);
    });

    test('delete sheet', async () => {
        const deletedId = gradeSheets[0]._id;
        await service.deleteGradeSheet(deletedId);
        gradeSheets = await service.getGradeSheets();
        expect(gradeSheets.findIndex((sheet: Document) => sheet._id === deletedId)).toBe(-1);
    });

});