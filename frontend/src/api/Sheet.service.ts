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
            const sheet = sheetsData[i];
            let mentorName: string, mentorSurname: string;
            try {
                const mentorRes = await this.api.get('/users/' + sheet.mentorID);
                const mentor = mentorRes.data as UserData;
                [mentorName, mentorSurname] = [mentor.name, mentor.surname];
            } catch(err) {
                [mentorName, mentorSurname] = ['---', '---'];
            }
            
            let projectName: string;
            try {
                const projectRes = await this.api.get('/team/projects/' + sheet.projectID);
                const project: TeamProjectData = projectRes.data;
                projectName = project.projectName;
            } catch (err) {
                projectName = '---';
            }
            
            sheets.push({
                ..._.omit(sheet, '_id'),
                id: sheet._id,
                mentorName,
                mentorSurname,
                projectName,
            });
        }
        
        return sheets;
    }

    createSheet = async () => {
        await this.api.post('/grade/sheets', {});
    }

    deleteSheet = async (id: string) => {
        await this.api.delete('/grade/sheets/' + id);
    }

    getMentorSheets = async (mentorId?: string): Promise<GradeSheetData[] | null>  => {
        let gradeSheetsRes;
        console.log({mentorId});
        try {
            gradeSheetsRes = await this.api.get(`/mentors/${mentorId}/grade/sheets`);
        } catch(err) {
            return null;
        }
        console.log(gradeSheetsRes);
        return gradeSheetsRes.data as GradeSheetData[];
    }

}
