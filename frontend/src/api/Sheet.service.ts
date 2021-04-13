import BaseService from '../app/baseService';
import { GradeSheet, GradeSheetData, TeamProjectData, UserData } from '../models';
import _ from 'lodash';


export default class SheetService {

    constructor(
        private api = new BaseService()
    ) { }

    getSheets = async () => {
        const response = await this.api.get('/grade/sheets');
        const sheetsData = response.data as GradeSheetData[];
        const sheets: GradeSheet[] = [];
        for(let i in sheetsData) {
            const sheet = await this.getSheetInfo(sheetsData[i]);
            sheets.push(sheet);
        }

        return sheets;
    }

    getSheetInfo = async (sheet: GradeSheetData) => {
        let mentorName: string, mentorSurname: string;
        try {
            const mentorRes = await this.api.get('/users/' + sheet.mentorID);
            const mentor = mentorRes.data as UserData;
            [mentorName, mentorSurname] = [mentor.name, mentor.surname];
        } catch(err) {
            [mentorName, mentorSurname] = ['---', '---'];
        }
        
        let projectName: string, projectUrl: string, projectDescription: string;
        try {
            const projectRes = await this.api.get('/team/projects/' + sheet.projectID);
            const project: TeamProjectData = projectRes.data;
            projectName = project.projectName;
            projectUrl = project.projectUrl;
            projectDescription = project.description;
        } catch (err) {
            projectName = '---';
            [projectName, projectUrl, projectDescription] = ['---', '---', '---'];
        }
        
        return {
            ..._.omit(sheet, '_id'),
            id: sheet._id,
            mentorName,
            mentorSurname,
            projectName,
            projectUrl,
            projectDescription,
        };
    }

    getSheet = async (id: string) => {
        const response = await this.api.get('/grade/sheets/' + id);
        return this.getSheetInfo(response.data);
    }

    createSheet = async () => {
        await this.api.post('/grade/sheets', {
            mentorID: '507f1f77bcf86cd799439011',
            projectID: '507f1f77bcf86cd799439011',
        });
    }

    deleteSheet = async (id: string) => {
        await this.api.delete('/grade/sheets/' + id);
    }

    getMentorSheets = async (mentorId?: string): Promise<GradeSheetData[] | null>  => {
        let gradeSheetsRes;
        try {
            gradeSheetsRes = await this.api.get(`/mentors/${mentorId}/grade/sheets`);
        } catch(err) {
            return null;
        }
        return gradeSheetsRes.data as GradeSheetData[];
    }

    setMentor = async (id: string, mentorId: string) => {
        console.log('Error: Change mentor endpoint is not implemented!');
    }

    addParticipant = async (id: string, participantId: string) => {
        await this.api.post(`/grade/sheets/${id}/participants/${participantId}`, {});
    }

    deleteParticipant = async (id: string, participantId: string) => {
        await this.api.delete(`/grade/sheets/${id}/participants/${participantId}`);
    }

    addReviewer = async (id: string, mentorId: string) => {
        await this.api.post(`/grade/sheets/${id}/reviewer/${mentorId}`, {});
    }

    setMentorReviewerGrade = async (id: string, mentorId: string, grade: any) => {
        await this.api.patch(`grade/sheets/${id}/reviewer/${mentorId}/grades`, grade)
    }

    setMentorGrade = async (id: string, grade: any) => {
        await this.api.patch(`grade/sheets/${id}/reviewer/mentor/grades`, grade)
    }

}
