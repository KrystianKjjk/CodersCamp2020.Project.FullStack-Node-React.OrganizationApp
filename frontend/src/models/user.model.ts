export enum Role {
    Candidate,
    Participant,
    Mentor,
    Admin,
};

export enum Status {
    Active,
    Resigned,
    Archived,
};

export interface IUser {
    name: string,
    surname: string,
    email: string,
    type: Role,
    status: Status,
};

export interface IGrade {
    _id: string,
    sectionId: string,
    testPoints: number,
    testMaxPoints: number,
    taskPoints: number,
    taskMaxPoints: number,
    projectPoints: number
}

