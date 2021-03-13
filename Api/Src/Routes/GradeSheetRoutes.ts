import { validateReviewers, validateGrades, validateParticipants } from '../Models/GradeSheet';
import GradeSheetController from '../Controllers/GradeSheetController';
import idValidation, { idsValidation } from '../Middlewares/IdValidation';
import { propValid } from '../Middlewares/Validate';
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
        router.put('/grade/sheets/:id/reviewers', propValid(validateReviewers, 'reviewers'), idValidation, c.setMentorReviewers);
        router.patch('/grade/sheets/:id/mentor/grades', propValid(validateGrades, 'grades'), idValidation, c.setMentorGrades);
        router.patch('/grade/sheets/:id/reviewers/:mentorId/grades', propValid(validateGrades, 'grades'), idsValidation(), c.setMentorReviewerGrades);
        router.patch('/grade/sheets/:id/participants', propValid(validateParticipants, 'participants'), idValidation, c.updateParticipants);
        router.put('/grade/sheets/:id/participants', propValid(validateParticipants, 'participants'), idValidation, c.setParticipants);
        router.delete('/grade/sheets/:id/participants/:participantId', idsValidation(), c.removeParticipant);
        router.delete('/grade/sheets/:id', idValidation, c.deleteGradeSheet);
        router.patch('/grade/sheets/:id/add/reviewer/:mentorId', c.addMentorReviewer);
        router.patch('/grade/sheets/:id/reviewers', c.setMentorReviewers);
        router.patch('/grade/sheets/:id/mentor/grades', c.setMentorGrade);
        router.patch('/grade/sheets/:id/reviewers/:mentorId/grades', c.setMentorReviewerGrade);
        router.delete('/grade/sheets/:id', c.deleteGradeSheet);
        return router;
    }
}