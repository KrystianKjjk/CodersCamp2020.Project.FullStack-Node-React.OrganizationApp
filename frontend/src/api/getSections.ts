import api from './api';
import BaseService from '../app/baseService';
import { NullLiteral } from 'typescript';

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
    description?: string;
    courseName: string;
}

interface Course {
    _id: string;
    name: string;
}

export default async function getSections(authToken: string | null): Promise<any[]> {
    const config = {
        headers: {
            'x-auth-token': authToken,
        }
    };
    //const team = await api.get<Team[]>('/teams', config);
    const coursesRes = await api.get<Course[]>('api/courses', config);
    const courses = coursesRes.data;
    let allSections: Section[] = [];
    for (let i in courses) {
        const sections = await api.get<SectionData[]>('api/sections', config);
        const newData = sections.data.map( section => ({
            id: section._id,
            name: section.name,
            startDate: section.startDate,
            endDate: section.endDate,
            courseName: courses[i].name,
        }) );
        allSections = allSections.concat(newData);
    }
    return allSections;
}

export async function getOneSection(authToken: string | null, id: string):  Promise<Section[]> {
    const config = {
        headers: {
            'x-auth-token': authToken,
        }
    };
    let sectionData;
    try {
        sectionData = await api.get<Section[]>(`/api/sections/${id}`, config);
    } catch(err) {
        return [];
    }
    console.log(sectionData);
    return sectionData.data;
}

// export async function getOneSection(authToken: string | null, id: string) {
//     const config = {
//         headers: {
//             'x-auth-token': authToken,
//         }
//     };
//     const sections = await api.get(`/api/sections/${id}`, config);

//     const newData fetch.section
//     const newData = sections.data.forEach(function() => ({
//         id: sections.data._id,
//         name: sections.data.name,
//         startDate: sections.data.startDate,
//         endDate: sections.data.endDate,
//         description:sections.data.description,
//         courseName: sections.data.course,
//     }));
    
//     // const newDataSection = {
//     //     id: sections.data._id,
//     //     name: sections.data.name,
//     //     startDate: sections.data.startDate,
//     //     endDate: sections.data.endDate,
//     //     description:sections.data.description,
//     //     courseName: sections.data.course,
//     // }
//     console.log(newData);
//     return newData;
// }