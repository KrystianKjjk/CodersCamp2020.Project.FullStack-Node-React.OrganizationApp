import GradeSheetService from '../Src/Services/GradeSheetService';
import GradeSheetRepository from '../Src/Repositories/GradeSheetRepository';
import { GradeSheet } from '../Src/Models/GradeSheet';
import GradeSheetDbModel from '../Src/Models/GradeSheet';
import { Document, Types } from 'mongoose';
import * as _ from 'lodash';


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
        return this.gradeSheets.find(sheet => `${sheet._id}` === `${id}`) ?? null;
    };

    async getIndexById(id: Types.ObjectId) {
        return this.gradeSheets.findIndex(sheet => `${sheet._id}` === `${id}`);
    }

    async create(gradeSheet: GradeSheet) {
        const newGradeSheet = new this.model(gradeSheet) as GradeSheet & Document;
        this.gradeSheets.push(newGradeSheet);
    };

    async updateById(id: Types.ObjectId, props: object) {
        const index = await this.getIndexById(id);
        Object.assign(this.gradeSheets[index], props)
    };

    async deleteById(id: Types.ObjectId) {
        this.gradeSheets = this.gradeSheets.filter(sheet => `${sheet._id}` !== `${id}`);
    };

    async addMentorReviewer(gradeSheetId: Types.ObjectId, mentorId: Types.ObjectId) {
        const index = await this.getIndexById(gradeSheetId);
        const gradeSheet = this.gradeSheets[index];
        if(gradeSheet.mentorReviewer.findIndex(mentor => `${mentor}` === `${mentorId}`) > -1) return gradeSheet;
        gradeSheet.mentorReviewer.push(mentorId);
        return gradeSheet;
    }

    async setMentorReviewers(gradeSheetId: Types.ObjectId, mentorIds: Types.ObjectId[]) {
        this.updateById(gradeSheetId, {mentorReviewer: mentorIds});
    }

    async getReviewerGrades(gradeSheetId: Types.ObjectId, mentorId: Types.ObjectId) {
        const sheet = await this.getById(gradeSheetId);
        return sheet.mentorReviewerGrades.find(grade => `${grade.mentor}` === `${mentorId}`)
    }

    async save(doc: Document) {
        return doc;
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
            participants: [],
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
                participants: [],
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
        const sheet: GradeSheet = _.cloneDeep(gradeSheets[idx]);
        const sheetId = gradeSheets[idx]._id;
        const grades = {'ExtraGrade': 111, 'Design': 10, 'repo': 9, 'App': 10};
        await service.setMentorGrades(sheetId, grades);
        for (let name in grades)
            expect(gradeSheets[idx].mentorGrades[name]).toBe(grades[name]);
        for (let name in sheet.mentorGrades)
            if ( !(name in grades) )
                expect(gradeSheets[idx].mentorGrades[name]).toBe(sheet.mentorGrades[name]);
        expect(await service.setMentorGrades(Types.ObjectId(), grades)).toBeNull();
    });

    test('get/set mentor reviewer grades', async () => {
        const idx = 7;
        const sheet: GradeSheet = _.cloneDeep(gradeSheets[idx]);
        const sheetId = gradeSheets[idx]._id;
        const mentorIdx = 0;
        const mentorId = gradeSheets[idx].mentorReviewer[0];
        const grades = {'ExtraGrade': 33, 'Design': 11, 'repo': 12, 'App': 13};
        await service.setMentorReviewerGrades(sheetId, mentorId, grades);
        for (let name in grades)
            expect(gradeSheets[idx].mentorReviewerGrades[mentorIdx].grades[name]).toBe(grades[name]);
        for (let name in sheet.mentorReviewerGrades[mentorIdx].grades)
            if ( !(name in grades) )
                expect(gradeSheets[idx].mentorReviewerGrades[mentorIdx].grades[name])
                    .toBe(sheet.mentorReviewerGrades[mentorIdx].grades[name]);
        expect(await service.setMentorReviewerGrades(Types.ObjectId(), mentorId, grades)).toBeNull();
        expect(await service.setMentorReviewerGrades(sheetId, Types.ObjectId(), grades)).toBeNull();
    });

    test('delete sheet', async () => {
        const deletedId = gradeSheets[0]._id;
        await service.deleteGradeSheet(deletedId);
        gradeSheets = await service.getGradeSheets();
        expect(gradeSheets.findIndex((sheet: Document) => sheet._id === deletedId)).toBe(-1);
    });

    test('get/set/update/delete participants', async () => {
        const idx = 7;
        const sheetId = gradeSheets[idx]._id;
        const participantID = Types.ObjectId();
        await service.addParticipant(sheetId, participantID);
        expect(`${gradeSheets[idx].participants[0].participantID}`).toBe(`${participantID}`);
        await service.addParticipant(sheetId, participantID);
        expect(gradeSheets[idx].participants).toHaveLength(1);
        expect(await service.addParticipant(Types.ObjectId(), participantID)).toBeNull();

        const engagement = 100;
        const participants = [{participantID, engagement}, {participantID: Types.ObjectId(), engagement}];
        await service.updateParticipants(sheetId, participants);
        expect(await service.updateParticipants(Types.ObjectId(), participants)).toBeNull();
        expect(gradeSheets[idx].participants[0].engagement).toBe(engagement);
        
        const newParticipants = [{participantID}, {participantID: Types.ObjectId()}];
        await service.setParticipants(sheetId, newParticipants);
        expect(await service.setParticipants(Types.ObjectId(), newParticipants)).toBeNull();
        expect(gradeSheets[idx].participants).toHaveLength(newParticipants.length);

        expect(await service.removeParticipant(Types.ObjectId(), participantID)).toBeNull();
        expect(gradeSheets[idx].participants).toHaveLength(2);
        await service.removeParticipant(sheetId, participantID);
        expect(gradeSheets[idx].participants).toHaveLength(1);
        expect(await service.removeParticipant(sheetId, Types.ObjectId())).toBeNull();
        expect(gradeSheets[idx].participants.find(part => `${part.participantID}` === `${participantID}`)).toBeUndefined();
    });
});