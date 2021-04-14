import BaseService from '../app/baseService';

interface TeamProject {
    _id: string,
    teamId: Team,
    parentProjectId: Project,
    projectName: string,
    projectUrl: string,
    description: string
}

interface Team {
    _id: string,
    mentor: string;
    users: string[];
    course: string
}

interface Project {
    _id: string,
    sectionId: string,
    projectName: string,
    projectUrl: string,
    description: string
}

const api = new BaseService();

async function getTeamProjects(): Promise<any[]> {
    const course = localStorage.getItem('activeCourse');
    const courseId = course ? JSON.parse(course)._id : null;

    const response = await api.get('/teams/projects');
    const allProjects = await Promise.all(response.data.map((project: TeamProject) => getProjectDetailedData(project)));
    //@ts-ignore
    if (courseId)  return allProjects.filter(project => project.CourseId === courseId);
    return allProjects;
}

async function getProjectDetailedData(project: TeamProject) {
    const returnProject = {
        ...project,
        id: project._id,
        Mentor: '',
        Name: project.projectName,
        ReferenceProject: '',
        Section: '',
        CourseId: ''
    }

    try {
        const mentor = await api.get(`/users/${project.teamId.mentor}`);
        returnProject.Mentor = `${mentor.data.name} ${mentor.data.surname}`;
    }
    catch(error) {
        returnProject.Mentor = `--- ---`
    }      
    
    if (project.parentProjectId) {
        returnProject.ReferenceProject = project.parentProjectId.projectName;
        try {
            const section = await api.get(`/sections/${project.parentProjectId.sectionId}`);
            returnProject.Section = section.data.name;
            returnProject.CourseId = section.data.course;
        }
        catch {
            returnProject.Section = '';
        }
    }   

    return returnProject;
}

export {getTeamProjects};