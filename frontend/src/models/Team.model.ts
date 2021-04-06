export interface TeamData {
    _id: string;
    mentor: {
        name: string;
        surname: string;
    } | null;
    course: {
        name: string;
    }
}

export interface Team {
    id: string;
    name: string;
    surname: string;
    courseName: string;
}