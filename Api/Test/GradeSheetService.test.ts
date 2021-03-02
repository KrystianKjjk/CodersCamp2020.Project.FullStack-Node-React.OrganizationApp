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

    async addMentorReviewer(gradeSheetId: Types.ObjectId, mentorId: Types.ObjectId) {
        const gradeSheet = await this.getById(gradeSheetId);
        const reviewers = [...gradeSheet.mentorReviewer, mentorId];
        this.updateById(gradeSheetId, {mentorReviewer: reviewers});
    }

    async setMentorReviewers(gradeSheetId: Types.ObjectId, mentorIds: Types.ObjectId[]) {
        this.updateById(gradeSheetId, {mentorReviewer: mentorIds});
    }

    async setMentorGrade(gradeSheetId: Types.ObjectId, gradeName: string, grade: number) {
        const index = this.gradeSheets.findIndex(sheet => sheet._id === gradeSheetId);
        this.gradeSheets[index].mentorGrades[gradeName] = grade;
    }

    async setMentorReviewerGrade(gradeSheetId: Types.ObjectId, mentorId: Types.ObjectId, gradeName: string, grade: number) {
        const index = this.gradeSheets.findIndex(sheet => sheet._id === gradeSheetId);
        const reviewerGrades = this.gradeSheets[index].mentorReviewerGrades;
        const reviewerIndex = reviewerGrades.findIndex(grades => grades.mentor === mentorId);
        reviewerGrades[reviewerIndex].grades[gradeName] = grade;
    }

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

    test('add mentor reviewer', async () => {
        const idx = 0;
        const sheetId = gradeSheets[idx]._id;
        const mentorId = new Types.ObjectId();
        expect(gradeSheets[idx].mentorReviewer).toHaveLength(0);
        await service.addMentorReviewer(sheetId, mentorId);
        expect(gradeSheets[idx].mentorReviewer).toHaveLength(1);
    });

    test('set mentor reviewers', async () => {
        const idx = 1;
        const sheetId = gradeSheets[idx]._id;
        const mentorIds = [];
        expect(gradeSheets[idx].mentorReviewer).toHaveLength(1);
        await service.setMentorReviewers(sheetId, mentorIds);
        expect(gradeSheets[idx].mentorReviewer).toHaveLength(0);
    });

    test('set mentor grade', async () => {
        const idx = 7;
        const sheetId = gradeSheets[idx]._id;
        const gradeName = 'ExtraGrade';
        const grade = 111;
        await service.setMentorGrade(sheetId, gradeName, grade);
        expect(gradeSheets[idx].mentorGrades[gradeName]).toBe(grade);
    });

    test('set mentor reviewer grade', async () => {
        const idx = 7;
        const sheetId = gradeSheets[idx]._id;
        const mentorId = gradeSheets[idx].mentorReviewer[0];
        const gradeName = 'ExtraRevGrade';
        const grade = 321;
        await service.setMentorReviewerGrade(sheetId, mentorId, gradeName, grade);
        expect(gradeSheets[idx].mentorReviewerGrades[0].grades[gradeName]).toBe(grade);
    });

    test('delete sheet', async () => {
        const deletedId = gradeSheets[0]._id;
        await service.deleteGradeSheet(deletedId);
        gradeSheets = await service.getGradeSheets();
        expect(gradeSheets.findIndex((sheet: Document) => sheet._id === deletedId)).toBe(-1);
    });

});