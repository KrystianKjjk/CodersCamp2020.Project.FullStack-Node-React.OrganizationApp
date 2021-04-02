import api from './api';


export interface Grades {
    [grade: string]: number;
};

export interface GradeSheetData {
    _id: string;
    projectID: string;
    participants: {
        participantID: string;
        engagement: number;
        role: string;
        rolePoints: number;
    }[];
    reviewers: {
        _id: string;
        email: string;
        name: string;
        surname: string;
    }[];
    mentorGrades: Grades;
    mentorReviewerGrades: {
        mentorID: string;
        grades: Grades;
    }[];
};

export default async function getMentorSheets(mentorId?: string): Promise<GradeSheetData[] | null> {
    let gradeSheetsRes;
    console.log({mentorId});
    try {
        gradeSheetsRes = await api.get<GradeSheetData[]>(`/mentors/${mentorId}/grade/sheets`);
    } catch(err) {
        return null;
    }
    console.log(gradeSheetsRes);
    return gradeSheetsRes.data;
}