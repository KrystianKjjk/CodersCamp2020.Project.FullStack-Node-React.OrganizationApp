import BaseService from '../app/baseService';
import { GradeSheet, GradeSheetData, TeamProjectData, UserData, SheetGrade, Grades, Participant, Reviewer } from '../models';
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

    getSheetInfo = async (sheet: GradeSheetData): Promise<GradeSheet> => {
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
            console.log(sheet.projectID);
            const projectRes = await this.api.get('/team/projects/' + sheet.projectID);
            console.log(projectRes);
            const project: TeamProjectData = projectRes.data;
            projectName = project.projectName;
            projectUrl = project.projectUrl;
            projectDescription = project.description;
        } catch (err) {
            projectName = '---';
            [projectName, projectUrl, projectDescription] = ['---', '---', '---'];
        }
        
        const participants = sheet.participants ?? [];
        for(let i in participants) {
            const user = participants[i];
            try {
                const userRes = await this.api.get('/users/' + user.participantID);
                const userData = userRes.data as UserData;
                participants[i].name = userData.name;
                participants[i].surname = userData.surname;
            } catch(err) {
                participants[i].name = '---';
                participants[i].surname = '---';
            }    
        };

        const reviewers = sheet.reviewers ?? [];
        const reviewersInfo = await Promise.all( reviewers.map( async userId => {
            const reviewer: Reviewer = {
                _id: userId,
                name: '---',
                surname: '---',
                email: '---',
            }
            try {
                const userRes = await this.api.get('/users/' + userId);
                const userData = userRes.data as UserData;
                reviewer._id = userId;
                reviewer.name = userData.name;
                reviewer.surname = userData.surname;
                reviewer.email = userData.surname;
            } catch(err) {
                
            }
            return reviewer;
        } ) );

        return {
            ..._.omit(sheet, '_id'),
            id: sheet._id,
            projectID: sheet.projectID ?? '',
            mentorID: sheet.mentorID ?? '',
            participants,
            mentorGrades: sheet.mentorGrades ?? {},
            mentorName,
            mentorSurname,
            projectName,
            projectUrl,
            projectDescription,
            reviewers: reviewersInfo,
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

    getParticipants = async (id: string): Promise<(Participant & {id: string})[]> => {
        const sheet = await this.getSheet(id);
        return sheet.participants.map(p => ({
            ...p,
            id: p.participantID,
        }));
    }

    getMentorGrades = async (id: string): Promise<Grades> => {
        const sheet = await this.getSheet(id);
        return sheet.mentorGrades;
    }


    setMentor = async (id: string, mentorId: string) => {
        await this.api.put(`/grade/sheets/${id}/set/mentor/${mentorId}`, {});
    }

    setProject = async (id: string, projectId: string) => {
        await this.api.put(`/grade/sheets/${id}/set/project/${projectId}`, {});
    }

    addParticipant = async (id: string, participantId: string) => {
        await this.api.post(`/grade/sheets/${id}/add/participant/${participantId}`, {});
    }

    deleteParticipant = async (id: string, participantId: string) => {
        await this.api.delete(`/grade/sheets/${id}/participants/${participantId}`);
    }

    addReviewer = async (id: string, mentorId: string) => {
        await this.api.post(`/grade/sheets/${id}/add/reviewer/${mentorId}`, {});
    }

    setReviewers = async (id: string, reviewers: string[]) => {
        await this.api.put(`/grade/sheets/${id}/reviewers`, {reviewers})
    }

    setMentorReviewerGrade = async (id: string, mentorId: string, grades: Grades) => {
        await this.api.put(`/grade/sheets/${id}/reviewers/${mentorId}/grades`, { grades })
    }

    patchMentorReviewerGrade = async (id: string, mentorId: string, grades: Grades) => {
        await this.api.patch(`/grade/sheets/${id}/reviewers/${mentorId}/grades`, { grades })
    }

    setMentorGrade = async (id: string, grades: Grades) => {
        await this.api.put(`/grade/sheets/${id}/mentor/grades`, { grades })
    }

    patchMentorGrade = async (id: string, grades: Grades) => {
        await this.api.patch(`/grade/sheets/${id}/mentor/grades`, { grades })
    }

}
