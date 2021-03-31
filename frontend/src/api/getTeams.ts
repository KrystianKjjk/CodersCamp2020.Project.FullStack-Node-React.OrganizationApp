import api from './api';


interface Team {
    _id: string;
    mentor: {
        name: string;
        surname: string;
    }
    course: {
        name: string;
    }
}

export default async function getTeams(authToken: string): Promise<any[]> {
    const config = {
        headers: {
            'x-auth-token': authToken,
        }
    };
    const response = await api.get<Team[]>('/teams', config);
    return response.data.map( team => ({
        ...team,
        id: team._id,
        name: team.mentor.name,
        surname: team.mentor.surname,
        courseName: team.course.name,
    }) );
}