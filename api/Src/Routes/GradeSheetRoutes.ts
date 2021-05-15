import {
  validateReviewers,
  validateGrades,
  validateParticipants,
} from '../Models/GradeSheet'
import GradeSheetController from '../Controllers/GradeSheetController'
import idValidation, { idsValidation } from '../Middlewares/IdValidation'
import { propValid } from '../Middlewares/Validate'
import { HasRole, HasId } from '../Middlewares/HasRole'
import * as express from 'express'
import { UserType } from '../Models/User'

const isAdmin = HasRole([UserType.Admin])
export default function gradeSheetRoutes(c: GradeSheetController) {
  return (router: express.Router) => {
    // Admin routes
    router.get('/grade/sheets/:id', isAdmin, idValidation, c.getGradeSheet)
    router.get('/grade/sheets', isAdmin, c.getGradeSheets)
    router.get(
      '/participants/:id/grade/sheets',
      isAdmin,
      idValidation,
      c.getParticipantGradeSheets,
    )
    router.get(
      '/mentors/:id/grade/sheets',
      isAdmin,
      idValidation,
      c.getMentorGradeSheets,
    )
    router.get(
      '/reviewers/:id/grade/sheets',
      isAdmin,
      idValidation,
      c.getReviewerGradeSheets,
    )
    router.post('/grade/sheets', isAdmin, c.createGradeSheet)
    router.post(
      '/grade/sheets/:id/add/reviewer/:mentorId',
      isAdmin,
      idsValidation(),
      c.addMentorReviewer,
    )
    router.put(
      '/grade/sheets/:id/reviewers',
      isAdmin,
      propValid(validateReviewers, 'reviewers'),
      idValidation,
      c.setMentorReviewers,
    )
    router.put(
      '/grade/sheets/:id/set/mentor/:mentorId',
      isAdmin,
      idsValidation(),
      c.setMentor,
    )
    router.put(
      '/grade/sheets/:id/set/project/:projectId',
      isAdmin,
      idsValidation(),
      c.setProject,
    )
    router.post(
      '/grade/sheets/:id/add/participant/:participantId',
      isAdmin,
      idsValidation(),
      c.addParticipant,
    )
    router.patch(
      '/grade/sheets/:id/participants',
      isAdmin,
      propValid(validateParticipants, 'participants'),
      idValidation,
      c.updateParticipants,
    )
    router.put(
      '/grade/sheets/:id/participants',
      isAdmin,
      propValid(validateParticipants, 'participants'),
      idValidation,
      c.setParticipants,
    )
    router.patch(
      '/grade/sheets/:id/mentor/grades',
      isAdmin,
      propValid(validateGrades, 'grades'),
      idValidation,
      c.patchMentorGrades,
    )
    router.put(
      '/grade/sheets/:id/mentor/grades',
      isAdmin,
      propValid(validateGrades, 'grades'),
      idValidation,
      c.setMentorGrades,
    )
    router.patch(
      '/grade/sheets/:id/reviewers/:mentorId/grades',
      isAdmin,
      propValid(validateGrades, 'grades'),
      idsValidation(),
      c.setMentorReviewerGrades,
    )
    router.delete(
      '/grade/sheets/:id/participants/:participantId',
      isAdmin,
      idsValidation(),
      c.removeParticipant,
    )
    router.delete(
      '/grade/sheets/:id',
      isAdmin,
      idValidation,
      c.deleteGradeSheet,
    )

    // Participant route
    router.get(
      '/participants/me/:id/grade/sheets',
      HasId('id'),
      idValidation,
      c.getParticipantGradeSheets,
    )

    // Mentor routes
    router.get(
      '/mentors/me/:id/grade/sheets',
      HasId('id'),
      idValidation,
      c.getMentorGradeSheets,
    )
    router.patch(
      '/mentor/me/:mentorId/grade/sheets/:id/grades',
      HasId('mentorId'),
      propValid(validateGrades, 'grades'),
      idsValidation(),
      c.patchMentorGrades,
    )
    router.put(
      '/mentor/me/:mentorId/grade/sheets/:id/grades',
      HasId('mentorId'),
      propValid(validateGrades, 'grades'),
      idsValidation(),
      c.setMentorGrades,
    )

    // Mentor reviewer routes
    router.get(
      '/reviewers/me/:id/grade/sheets',
      HasId('id'),
      idValidation,
      c.getReviewerGradeSheets,
    )
    router.get(
      '/reviewers/me/:mentorId/grade/sheets/:id/grades',
      HasId('mentorId'),
      idsValidation(),
      c.getReviewerGrades,
    )
    router.patch(
      '/reviewers/me/:mentorId/grade/sheets/:id/grades',
      HasId('mentorId'),
      propValid(validateGrades, 'grades'),
      idsValidation(),
      c.patchMentorReviewerGrades,
    )
    router.put(
      '/reviewers/me/:mentorId/grade/sheets/:id/grades',
      HasId('mentorId'),
      propValid(validateGrades, 'grades'),
      idsValidation(),
      c.setMentorReviewerGrades,
    )

    return router
  }
}
