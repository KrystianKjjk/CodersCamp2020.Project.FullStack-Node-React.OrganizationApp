import * as mongoose from 'mongoose';

import {GradeSchema, GradeType} from "../Src/Models/Grade";
import Grade from "../Src/Models/Grade";
import GradeService from "../Src/Services/GradeService";
import GradeRepository from "../Src/Repositories/GradeRepository";
import {Types} from "mongoose";


class Repository extends GradeRepository {
    private grades: (GradeType)[] = [];

    constructor() {
        super(Grade);
    }

    async getAll(){
        return this.grades;
    }

    async getById(id: Types.ObjectId){
        return this.grades.find(course => course._id === id);
    }

    async create(grade: GradeType){
        this.grades.push(grade);
    }

    async deleteById(id: Types.ObjectId) {
        const index = this.grades.findIndex(grade => grade._id === id);
        (index > -1) && this.grades.splice(index, 1)
   };

    async updateById(id: Types.ObjectId, grade: GradeType){
        const index = this.grades.findIndex(grade => grade._id === id);
        this.grades[index] = grade;
        return grade;
    }
}

describe("GradeService", () => {
    let service: GradeService;

    beforeEach(()=>{
        service = new GradeService(new Repository());
    })

    test("create grade", async()=>{
        const grade = new Grade({
            sectionId: "604338da5aba215e80fa8e1a",
            testPoints: 280,
            testMaxPoints: 280,
            taskPoints: 35,
            taskMaxPoints: 35,
            projectPoints: 60
            });
        await service.createGrade(grade);
        expect(await service.findGrade(grade._id)).toEqual(grade);
    });

    test("get all grades", async ()=>{
        const grade1 = new Grade({
            sectionId: "604338da5aba215e80fa8e1a",
            testPoints: 280,
            testMaxPoints: 280,
            taskPoints: 35,
            taskMaxPoints: 35,
            projectPoints: 60
        });
        const grade2 = new Grade({
            sectionId: "604338da5aba215e80fa8e1a",
            testPoints: 0,
            testMaxPoints: 280,
            taskPoints: 0,
            taskMaxPoints: 35,
            projectPoints: 0
        });

        await service.createGrade(grade1);
        await service.createGrade(grade2);

        const grades = await service.getGrades();
        expect(grades[0]).toEqual(grade1);
        expect(grades[1]).toEqual(grade2);
    });
    test("delete grade", async()=>{
        const grade = new Grade({
            sectionId: "604338da5aba215e80fa8e1a",
            testPoints: 280,
            testMaxPoints: 280,
            taskPoints: 35,
            taskMaxPoints: 35,
            projectPoints: 60
        });

        await service.createGrade(grade);
        await service.deleteGrade(grade._id);

        expect((await service.getGrades()).length).toBe(0);
    });
   test("update grade", async ()=>{
       const grade = new Grade({
           sectionId: "604338da5aba215e80fa8e1a",
           testPoints: 280,
           testMaxPoints: 280,
           taskPoints: 35,
           taskMaxPoints: 35,
           projectPoints: 60
       });

       await service.createGrade(grade);
       grade.testPoints = 100;
       expect((await service.updateGrade(grade._id, grade))).toBe(grade);
   });
});
