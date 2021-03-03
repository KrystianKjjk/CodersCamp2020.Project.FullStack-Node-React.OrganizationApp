import GradeSheetController from '../Controllers/GradeSheetController';
import * as express from 'express';


export default function gradeSheetRoutes(c: GradeSheetController) {
    return (router: express.Router) => {
        router.get('/grade/sheets/:id', c.getGradeSheet);
        router.get('/grade/sheets', c.getGradeSheets);
        router.post('/grade/sheets', c.createGradeSheet);
        router.patch('/grade/sheets/reviewer/:id', c.addMentorReviewer);
        router.patch('/grade/sheets/reviewers/:id', c.setMentorReviewers);
        router.patch('/grade/sheets/mentor/grade/:id', c.setMentorGrade);
        router.patch('/grade/sheets/reviewer/grade/:id', c.setMentorReviewerGrade);
        router.delete('/grade/sheets/:id', c.deleteGradeSheet);
        return router;
    }
}