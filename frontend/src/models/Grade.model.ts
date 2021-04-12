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
