export interface SectionData {
    _id: string;
    name: string;
    startDate?: string;
    endDate?: string;
    tests?: Test[];
    referenceProjectId?: {
        _id: string
        projectName: string
    };
    description?: string;
    course: string;
}

export interface SectionDataUpdate extends Omit<SectionData, 'referenceProjectId'> {
    referenceProjectId?: string;
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
    referenceProjectName?: string;
    referenceProjectId?: string;
    courseName: string;
    courseId: string;
};

export const testTypDict = {
    [TestType.sample]: 'sample',
    [TestType.theoretical]: 'theoretical',
    [TestType. practical]: ' practical',
}