//Osobne dla kazdego uczestnika, symbolizuje ocene za jeden Section (dzial) 
export interface Grade {
    id: number,
    sectionId: number,
    projectId: number,
    testPoints: number,
    testMaxPoints: number,
    testAssignmentPoints: number,
    testAssignmentMaxPoints: number,
    projectPoints: number,
    projectMaxPoints: number
}