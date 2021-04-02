import api from './api';


interface Grades {
    [grade: string]: number;
};

interface GradeSheetData {
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

const sum = (numbers: number[]) => numbers.reduce((acc, x) => acc + x, 0);
const sumPoints = (grades: Grades) => sum( Object.values(grades) );

export function calcProjectGrade(sheet: GradeSheetData) {
    const mentorPoints = sumPoints(sheet.mentorGrades);
    const reviewersPoints = sheet.mentorReviewerGrades.map( reviewer => sumPoints(reviewer.grades) );
    return ( mentorPoints + sum(reviewersPoints) ) / (reviewersPoints.length + 1);
}

export function calcUserProjectGrade(sheet: GradeSheetData, userId: string) {
    const projectPoints = calcProjectGrade(sheet);
    const user = sheet.participants.find(user => user.participantID === userId);
    if (!user) return null;
    return projectPoints * user.engagement / 100 + user.rolePoints;
}

// export function calcUserGrade(sheet: GradeSheetData, user: User) {
//     const projectPoints = calcUserProjectGrade(sheet, user._id);
    
// }