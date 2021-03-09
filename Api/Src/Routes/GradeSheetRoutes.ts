import GradeSheetController from '../Controllers/GradeSheetController';
import * as express from 'express';


export default function gradeSheetRoutes(c: GradeSheetController) {
    return (router: express.Router) => {
        router.get('/grade/sheets/:id', c.getGradeSheet);
        router.get('/grade/sheets/:id/reviewers/:mentorId/grades', c.getReviewerGrades);
        router.get('/grade/sheets', c.getGradeSheets);
        router.post('/grade/sheets', c.createGradeSheet);
        router.patch('/grade/sheets/:id/add/reviewer/:mentorId', c.addMentorReviewer);
        router.patch('/grade/sheets/:id/reviewers', c.setMentorReviewers);
        router.patch('/grade/sheets/:id/mentor/grades', c.setMentorGrade);
        router.patch('/grade/sheets/:id/reviewers/:mentorId/grades', c.setMentorReviewerGrade);
        router.delete('/grade/sheets/:id', c.deleteGradeSheet);
        return router;
    }
}