export interface ManageSectionData {
    _id: string;
    name: string;
    startDate?: string;
    endDate?: string;
    tests?: Test[];
    description?: string;
    course: string;
}

export interface NewSectionData extends Omit<ManageSectionData, '_id'> {
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

export interface ManageSection {
    id: string;
    name: string;
    startDate?: number;
    endDate?: number;
    description?: string;
    courseName: string;
    courseId: string;
};

export const testTypDict = {
    [TestType.sample]: 'sample',
    [TestType.theoretical]: 'theoretical',
    [TestType. practical]: ' practical',
}