import BaseService from '../app/baseService';
import { CourseForSection, CourseDataForSection } from '../models/Course.model';
import { Section, SectionData, NewSectionData } from '../models/Section.model';
import { ProjectForSection, ProjectDataForSection } from '../models/Project.model';

export default class SectionService {
    
    constructor(private api = new BaseService()) { };

    getSections = async (): Promise<Section[]> => {
        const coursesResponse = await this.api.get('/courses');
        const courses = coursesResponse.data as CourseDataForSection[];
        const sections = (await this.api.get('/sections')).data as SectionData[];
        return sections.map( section => {
            const course = courses.find(course => course._id === section.course);
            return ({
                id: section._id,
                name: section.name,
                startDate: section.startDate ? new Date(section.startDate).getTime() / 1000 : undefined,
                endDate: section.endDate ? new Date(section.endDate).getTime() / 1000 : undefined,
                courseName: course ? course.name : '',
                courseId: course?._id || '',
            })
        });
    }

    getSectionsByCourseId = async (id: string): Promise<Section[]> => {
        const courseResponse = await this.api.get(`/courses/${id}`);
        const course = courseResponse.data as CourseDataForSection;
        const sections = (await this.api.get(`/courses/${id}/sections`)).data as SectionData[];
        return sections.map( section => {
            return ({
                id: section._id,
                name: section.name,
                startDate: section.startDate ? new Date(section.startDate).getTime() / 1000 : undefined,
                endDate: section.endDate ? new Date(section.endDate).getTime() / 1000 : undefined,
                courseName: course ? course.name : '',
                courseId: course?._id || '',
            })
        });
    }

    getCourses = async (): Promise<CourseForSection[]> => {
        const courses = (await this.api.get('/courses')).data as CourseDataForSection[];
        return courses.map( course => {
            return ({
                id: course._id,
                courseName: course.name,
            })
        });
    }

    getProjectForSection = async (id: string): Promise<ProjectForSection> => {
        const projects = (await this.api.get('/projects')).data as ProjectDataForSection[];
        const project = projects.find(project => project.sectionId && project.sectionId === id);
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
                course = coursesResponse.data as CourseDataForSection;
            } catch (e) {};
        } 
        return {
            id: section._id,
            name: section.name,
            startDate: section.startDate ? new Date(section.startDate).getTime() / 1000 : undefined,
            endDate: section.endDate ? new Date(section.endDate).getTime() / 1000 : undefined,
            description: section.description,
            courseName: course ? course.name : '',
            courseId: course?._id || '',
        };
    }

    patchSection  = async (id: string, data: NewSectionData) => {
        await this.api.put(`/sections/${id}`, data);
    }

    addSection  = async (data: NewSectionData) => {
        await this.api.post(`/sections`, data);
    }

    deleteSection = async (id: string) => {
        await this.api.delete(`/sections/${id}`);
    }
}



