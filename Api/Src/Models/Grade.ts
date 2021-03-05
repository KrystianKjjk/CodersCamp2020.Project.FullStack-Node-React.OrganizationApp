//Osobne dla kazdego uczestnika, symbolizuje ocene za jeden Section (dzial) 
export interface Grade {
    id: number,
    sectionId: number,
/*  projectId: number,*/
    testPoints: number,
    testMaxPoints: number,
    taskPoints: number,
    taskMaxPoints: number,
/*  projectPoints: number,
    projectMaxPoints: number,*/
    rolePoints:number,
    roleMaxPoints:number,
    additionalPoints:number,
    additionalMaxPoints:number
}
