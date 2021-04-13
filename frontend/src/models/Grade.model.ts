export interface Grades {
    [grade: string]: number;
};

interface Participant {
    participantID: string;
    engagement?: number;
    role?: string;
    rolePoints?: number;
}

export interface GradeSheetData {
    _id: string;
    projectID: string;
    mentorID: string;
    participants: Participant[];
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

export interface GradeSheet {
    id: string;
    projectID?: string;
    projectName: string;
    mentorName: string;
    mentorSurname: string;
    participants?: Participant[];
    reviewers?: {
        _id: string;
        email: string;
        name: string;
        surname: string;
    }[];
    mentorGrades?: Grades;
    mentorReviewerGrades?: {
        mentorID: string;
        grades: Grades;
    }[];
}
