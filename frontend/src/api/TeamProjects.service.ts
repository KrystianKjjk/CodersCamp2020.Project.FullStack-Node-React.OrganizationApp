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

 enum UserType {
    Candidate,
    Participant,
    Mentor,
    Admin,
};

enum UserStatus {
    Active,
    Resigned,
    Archived,
};

interface Mentor {
    name: string,
    surname: string,
    email: string,
    type: UserType,
    password: string,
    status: UserStatus,
    grades: number[]
};

interface ReferenceProject {
    _id: string,
    sectionId: number,
    projectName: string,
    projectUrl: string,
    description?: string
}

interface Section {
    _id: string,
    name: string,
    startDate: string,
    endDate: string,
    tests: [],
    referenceProjectId?: string, //standard project proposed by the organisers (e.g. StarWars Quiz for Javascript)
    description?: string,
    materials?: string[], //materials reference
    course: string
}

const api = new BaseService();

async function getTeamProjects(): Promise<any[]> {
    const response = await api.get('/teams/projects');
    return await Promise.all(response.data.map((project: TeamProject) => getProjectDetailedData(project)));
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

    if (project.teamId.mentor) {
        const mentor = await api.get(`/users/${project.teamId.mentor}`);
        returnProject.Mentor = `${mentor.data.name} ${mentor.data.surname}`;
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