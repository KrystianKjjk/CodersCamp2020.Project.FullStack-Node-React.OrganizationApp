import api from './api';


interface TeamData {
    _id: string;
    mentor: {
        name: string;
        surname: string;
    } | null;
    course: {
        name: string;
    }
}

interface Team {
    id: string;
    name: string;
    surname: string;
    courseName: string;
}

interface Course {
    _id: string;
    name: string;
}

export default async function getTeams(): Promise<any[]> {
    const coursesRes = await api.get<Course[]>('/courses');
    const courses = coursesRes.data;
    let allTeams: Team[] = [];
    for (let i in courses) {
        const teams = await api.get<TeamData[]>('/teams');
        const newData = teams.data.map( team => ({
            id: team._id,
            name: team?.mentor?.name ?? '---',
            surname: team?.mentor?.surname ?? '---',
            courseName: courses[i].name,
        }) );
        allTeams = allTeams.concat(newData);
        console.log(allTeams);
    }
    return allTeams;
}