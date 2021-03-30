export enum IRole {
    Candidate,
    Participant,
    Mentor,
    Admin,
};

export enum IStatus {
    Active,
    Resigned,
    Archived,
};

export interface IUser {
    name: string,
    surname: string,
    email: string,
    type: IRole,
    status: IStatus,
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

