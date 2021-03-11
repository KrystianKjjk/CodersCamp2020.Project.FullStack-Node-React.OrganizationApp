import GradeSheetController from '../Controllers/GradeSheetController';
import * as express from 'express';


export default function gradeSheetRoutes(c: GradeSheetController) {
    return (router: express.Router) => {
        router.get('/grade/sheets/:id', c.getGradeSheet);
        router.get('/grade/sheets', c.getGradeSheets);
        router.get('/grade/sheets/:id/reviewers/:mentorId/grades', c.getReviewerGrades);
        router.get('/participants/:id/grade/sheets', c.getParticipantGradeSheets);
        router.post('/grade/sheets', c.createGradeSheet);
        router.post('/grade/sheets/:id/add/reviewer/:mentorId', c.addMentorReviewer);
        router.post('/grade/sheets/:id/add/participant/:participantId', c.addParticipant);
        router.put('/grade/sheets/:id/reviewers', c.setMentorReviewers);
        router.patch('/grade/sheets/:id/mentor/grades', c.setMentorGrade);
        router.patch('/grade/sheets/:id/reviewers/:mentorId/grades', c.setMentorReviewerGrade);
        router.patch('/grade/sheets/:id/participants', c.updateParticipants);
        router.put('/grade/sheets/:id/participants', c.setParticipants);
        router.delete('/grade/sheets/:id/participants/:participantId', c.removeParticipant);
        router.delete('/grade/sheets/:id', c.deleteGradeSheet);
        return router;
    }
}