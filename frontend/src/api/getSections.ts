import api from './api';


interface SectionData {
    _id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    tests: Test[];
    referenceProjectId?: string;
    description?: string;
    course: {
        name: string;
    }
}

enum TestType {
    sample,
    theoretical,
    practical,
};

interface Test {
    _id: string;
    testType: TestType,
    testDate: Date,
    testUrl: string,
    testDescription?: string,
}

interface Section {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    courseName: string;
}

interface Course {
    _id: string;
    name: string;
}

export default async function getSections(authToken: string): Promise<any[]> {
    const config = {
        headers: {
            'x-auth-token': authToken,
        }
    };
    //const team = await api.get<Team[]>('/teams', config);
    const coursesRes = await api.get<Course[]>('/courses', config);
    const courses = coursesRes.data;
    let allSections: Section[] = [];
    for (let i in courses) {
        const sections = await api.get<SectionData[]>('/sections', config);
        const newData = sections.data.map( section => ({
            id: section._id,
            name: section.name,
            startDate: section.startDate,
            endDate: section.endDate,
            courseName: courses[i].name,
        }) );
        allSections = allSections.concat(newData);
        console.log(allSections);
    }
    return allSections;
}