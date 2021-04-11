export interface SectionData {
    _id: string;
    name: string;
    startDate?: string;
    endDate?: string;
    tests?: Test[];
    description?: string;
    course: string;
}

export interface NewSectionData extends Omit<SectionData, '_id'> {
}

export enum TestType {
    sample,
    theoretical,
    practical,
};

export interface Test {
    _id: string;
    testType: TestType,
    testDate: Date,
    testUrl: string,
    testDescription?: string,
};

export interface Section {
    id: string;
    name: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    courseName: string;
    courseId: string;
};

export const testTypDict = {
    [TestType.sample]: 'sample',
    [TestType.theoretical]: 'theoretical',
    [TestType. practical]: ' practical',
}