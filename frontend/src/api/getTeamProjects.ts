import api from './api';

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



async function getTeamProjects(): Promise<any[]> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRmYmFlMWEyZTM4ZDAwMTVlZTQxZWQiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTA3NDksImV4cCI6MTYxNjc5MTk0OX0.cYNseRM97U7IgwXKVQgRwBVd7SQWpeHJ4grgWUqsf6w';
     // window.localStorage.getItem('token')'' or something like tkhat to replace the token above

    const config = {
        headers: {
            'x-auth-token': token,
        }
    };
    const response = await api.get<TeamProject[]>('/teams/projects', config);
    return await Promise.all(response.data.map(project => getProjectDetailedData(project, token)));
}

async function getProjectDetailedData(project: TeamProject, authToken: string) {
    const config = {
        headers: {
            'x-auth-token': authToken,
        }
    };
    const returnProject = {
        ...project,
        id: project._id,
        Mentor: '',
        Name: project.projectName,
        ReferenceProject: '',
        Section: ''
    }

    if (project.teamId.mentor) {
        const mentor = await api.get<Mentor>(`/users/${project.teamId.mentor}`, config);
        returnProject.Mentor = `${mentor.data.name} ${mentor.data.surname}`;
    }
    if (project.parentProjectId) {
        returnProject.ReferenceProject = project.parentProjectId.projectName;
        try {
            const section = await api.get<Section>(`/sections/${project.parentProjectId.sectionId}`, config);
            returnProject.Section = section.data.name;
        }
        catch {
            returnProject.Section = ''
        }
    }
    return returnProject;
}

export {getTeamProjects};