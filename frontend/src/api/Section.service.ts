import { String } from 'lodash';
import BaseService from '../app/baseService';
import { CourseData } from '../models/Course.model';
import { Section, SectionData } from '../models/Section.model';

export default class SectionService {
    
    constructor(private api = new BaseService()) { };

    getSections = async (): Promise<Section[]> => {
        const coursesResponse = await this.api.get('/courses');
        const courses = coursesResponse.data as CourseData[];
        const sections = (await this.api.get('/sections')).data as SectionData[];
        return sections.map( section => {
            const course = courses.find(course => course._id === section.course);
            return ({
                id: section._id,
                name: section.name,
                startDate: section.startDate ? new Date(section.startDate) : undefined,
                endDate: section.endDate ? new Date(section.endDate) : undefined,
                referenceProjectName: section.referenceProjectId?.projectName || '',
                courseName: course ? course.name : '',
            })
        });

    }

    getOneSection  = async (id: string): Promise<Section> => {
        
        const section = (await this.api.get(`/sections/${id}`)).data as SectionData;
        const coursesResponse = await this.api.get(`/courses/${section.course}`);
        const course = coursesResponse.data as CourseData;
        return {
            id: section._id,
            name: section.name,
            startDate: section.startDate ? new Date(section.startDate) : undefined,
            endDate: section.endDate ? new Date(section.endDate) : undefined,
            referenceProjectName: section.referenceProjectId?.projectName || '',
            description: section.description,
            courseName: course ? course.name : '',
        };
       
    }
}


