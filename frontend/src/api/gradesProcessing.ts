import { UserData, Grades, GradeSheetData, Grade } from '../models'

const sum = (numbers: number[]) => numbers.reduce((acc, x) => acc + x, 0)
const sumPoints = (grades: Grades) => [
  sum(Object.values(grades).map((grade) => grade.points)),
  (Object.values(grades).length - 1) * 10,
]

export function calcProjectGrade(sheet: GradeSheetData) {
  const mentorPoints = sumPoints(sheet.mentorGrades)
  let [points, maxPoints] = mentorPoints
  sheet.mentorReviewerGrades.forEach((reviewer) => {
    if (!reviewer.grades) return
    const [revPooints, revMaxPoints] = sumPoints(reviewer.grades)
    points += revPooints
    maxPoints += revMaxPoints
  })
  return [points, maxPoints]
}

const MAX_ROLE_POINTS = 10
export function calcUserProjectGrade(sheet: GradeSheetData, userId: string) {
  const [projectPoints, maxPoints] = calcProjectGrade(sheet)
  const user = sheet.participants.find((user) => user.participantID === userId)
  if (!(user && user.engagement && user.rolePoints)) return null
  const points = (projectPoints * user.engagement) / 100 + user.rolePoints
  const max = maxPoints + MAX_ROLE_POINTS
  return [points, max]
}

export function calcUserTasksGrade(user: UserData) {
  let [points, maxPoints] = [0, 0]
  user.grades.forEach((grade) => {
    if (grade.taskPoints && grade.taskMaxPoints) {
      points += grade.taskPoints
      maxPoints += grade.taskMaxPoints
    }
  })
  return [points, maxPoints]
}

export function calcUserTestsGrade(user: UserData) {
  let [points, maxPoints] = [0, 0]
  user.grades.forEach((grade) => {
    if (grade.testPoints && grade.testMaxPoints) {
      points += grade.testPoints
      maxPoints += grade.testMaxPoints
    }
  })
  return [points, maxPoints]
}

export function calcTaskGrade(grade: Grade) {
  let taskGrade = grade?.taskPoints ?? 0
  const taskMax = grade?.taskMaxPoints
  if (taskMax) taskGrade = taskGrade / taskMax
  else taskGrade = 0
  return taskGrade
}

export function calcTestGrade(grade: Grade) {
  let testGrade = grade?.testPoints ?? 0
  const testMax = grade?.testMaxPoints
  if (testMax) testGrade = testGrade / testMax
  else testGrade = 0
  return testGrade
}

export function calcAvgGrade(grade: Grade) {
  const taskGrade = calcTaskGrade(grade)
  const testGrade = calcTestGrade(grade)
  const projectGrade = grade?.projectPoints ?? 0
  return 2 * testGrade + 3 * taskGrade + 5 * projectGrade
}
