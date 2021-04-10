import { String } from 'lodash';
import BaseService from '../app/baseService';
import { Course, CourseData } from '../models/Course.model';
import { Section, SectionData, Project, ProjectData } from '../models/Section.model';

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
                courseName: course ? course.name : '',
                courseId: course?._id || '',
            })
        });

    }

    getCourses = async (): Promise<Course[]> => {
        const courses = (await this.api.get('/courses')).data as CourseData[];
        return courses.map( course => {
            return ({
                id: course._id,
                courseName: course.name,
            })
        });
    }

    getProjectForSection = async (id: string): Promise<Project> => {
        const projects = (await this.api.get('/projects')).data as ProjectData[];
        const project = projects.find(project => project.sectionId === id);
        return {
            id: project?._id || '',
            projectName: project?.projectName || '',
        }
    }

    getOneSection  = async (id: string): Promise<Section> => {
        
        const section = (await this.api.get(`/sections/${id}`)).data as SectionData;
        let course = null;
        if (section.course) {
            try {
                const coursesResponse = await this.api.get(`/courses/${section.course}`);
                course = coursesResponse.data as CourseData;
            } catch (e) {};
        } 
        return {
            id: section._id,
            name: section.name,
            startDate: section.startDate ? new Date(section.startDate) : undefined,
            endDate: section.endDate ? new Date(section.endDate) : undefined,
            description: section.description,
            courseName: course ? course.name : '',
            courseId: course?._id || '',
        };
    }

    patchSection  = async (data: any) => {
        await this.api.put(`/sections/${data._id}`, data);
       
    }
}



