import GradeSheetController from '../Controllers/GradeSheetController';
import idValidation, {idsValidation} from '../Middlewares/IdValidation';
import * as express from 'express';


export default function gradeSheetRoutes(c: GradeSheetController) {
    return (router: express.Router) => {
        router.get('/grade/sheets/:id', idValidation, c.getGradeSheet);
        router.get('/grade/sheets', c.getGradeSheets);
        router.get('/grade/sheets/:id/reviewers/:mentorId/grades', idsValidation(), c.getReviewerGrades);
        router.get('/participants/:id/grade/sheets', idValidation, c.getParticipantGradeSheets);
        router.get('/mentors/:id/grade/sheets', idValidation, c.getMentorGradeSheets);
        router.get('/reviewers/:id/grade/sheets', idValidation, c.getReviewerGradeSheets);
        router.post('/grade/sheets', c.createGradeSheet);
        router.post('/grade/sheets/:id/add/reviewer/:mentorId', idsValidation(), c.addMentorReviewer);
        router.post('/grade/sheets/:id/add/participant/:participantId', idsValidation(), c.addParticipant);
        router.put('/grade/sheets/:id/reviewers', idValidation, c.setMentorReviewers);
        router.patch('/grade/sheets/:id/mentor/grades', idValidation, c.setMentorGrade);
        router.patch('/grade/sheets/:id/reviewers/:mentorId/grades', idsValidation(), c.setMentorReviewerGrade);
        router.patch('/grade/sheets/:id/participants', idValidation, c.updateParticipants);
        router.put('/grade/sheets/:id/participants', idValidation, c.setParticipants);
        router.delete('/grade/sheets/:id/participants/:participantId', idsValidation(), c.removeParticipant);
        router.delete('/grade/sheets/:id', idValidation, c.deleteGradeSheet);
        return router;
    }
}