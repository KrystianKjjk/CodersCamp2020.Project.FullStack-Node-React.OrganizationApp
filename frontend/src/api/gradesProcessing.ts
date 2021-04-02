import { User } from './getUsers';
import { Grades, GradeSheetData } from './getMentorSheets'


const sum = (numbers: number[]) => numbers.reduce((acc, x) => acc + x, 0);
const sumPoints = (grades: Grades) => [sum( Object.values(grades) ), (Object.values(grades).length - 1) * 10];

export function calcProjectGrade(sheet: GradeSheetData) {
    const mentorPoints = sumPoints(sheet.mentorGrades);
    let [points, maxPoints] = mentorPoints;
    sheet.mentorReviewerGrades.map(reviewer => {
        const [revPooints, revMaxPoints] = sumPoints(reviewer.grades);
        points += revPooints;
        maxPoints += revMaxPoints;
    });
    return [points, maxPoints];
}

const MAX_ROLE_POINTS = 10;
export function calcUserProjectGrade(sheet: GradeSheetData, userId: string) {
    const [projectPoints, maxPoints] = calcProjectGrade(sheet);
    const user = sheet.participants.find(user => user.participantID === userId);
    if (!user) return null;
    const points = projectPoints * user.engagement / 100 + user.rolePoints;
    const max = maxPoints + MAX_ROLE_POINTS;
    return [points, max];
}

export function calcUserTasksGrade(user: User) {
    let [points, maxPoints] = [0, 0];
    user.grades.forEach(grade => {
        if(grade.taskPoints && grade.taskMaxPoints){
            points += grade.taskPoints;
            maxPoints += grade.taskMaxPoints;
        }
    });
    return [points, maxPoints];
}

export function calcUserTestsGrade(user: User) {
    let [points, maxPoints] = [0, 0];
    user.grades.forEach(grade => {
        if(grade.testPoints && grade.testMaxPoints){
            points += grade.testPoints;
            maxPoints += grade.testMaxPoints;
        }
    });
    return [points, maxPoints];
}