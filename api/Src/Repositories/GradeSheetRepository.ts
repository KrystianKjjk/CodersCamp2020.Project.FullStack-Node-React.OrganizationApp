import { GradeSheet } from '../Models/GradeSheet'
import { Repository } from './Repository'
import * as mongoose from 'mongoose'

export interface GradeSheetFilters {
  sectionId?: string
  projectId?: string
  teamProjectId?: string
  courseId?: string
  mentorId?: string
  participantId?: string
  mentorReviewerId?: string
}

const lookupTeamProject = {
  $lookup: {
    from: 'teamProjects',
    localField: 'projectID',
    foreignField: '_id',
    as: 'project',
  },
}

const lookupParentProject = {
  $lookup: {
    from: 'projects',
    localField: 'project.parentProjectId',
    foreignField: '_id',
    as: 'parentProject',
  },
}

const lookupSection = {
  $lookup: {
    from: 'sections',
    localField: 'parentProject.sectionId',
    foreignField: '_id',
    as: 'section',
  },
}

const lookupMentor = {
  $lookup: {
    from: 'users',
    localField: 'mentorID',
    foreignField: '_id',
    as: 'mentor',
  },
}

const lookupParticipants = {
  $lookup: {
    from: 'users',
    localField: 'participants.participantID',
    foreignField: '_id',
    as: 'participantData',
  },
}

const lookupReviewers = {
  $lookup: {
    from: 'users',
    localField: 'reviewers',
    foreignField: '_id',
    as: 'reviewers',
  },
}

function createFilters(filters: GradeSheetFilters) {
  const {
    sectionId,
    projectId,
    teamProjectId,
    courseId,
    mentorId,
    participantId,
    mentorReviewerId,
  } = filters
  const teamProjectFilter = teamProjectId
    ? [
        {
          $match: { projectID: new mongoose.mongo.ObjectID(teamProjectId) },
        },
      ]
    : []

  const mentorFilter = mentorId
    ? [
        {
          $match: { mentorID: new mongoose.mongo.ObjectID(mentorId) },
        },
      ]
    : []

  const projectFilter = projectId
    ? [
        {
          $match: {
            'project.parentProjectId': new mongoose.mongo.ObjectID(projectId),
          },
        },
      ]
    : []

  const sectionFilter = sectionId
    ? [
        {
          $match: {
            'parentProject.sectionId': new mongoose.mongo.ObjectID(sectionId),
          },
        },
      ]
    : []

  const courseFilter = courseId
    ? [
        {
          $match: { 'section.course': new mongoose.mongo.ObjectID(courseId) },
        },
      ]
    : []

  const participantFilter = participantId
    ? [
        {
          $match: {
            'participantData._id': new mongoose.mongo.ObjectID(participantId),
          },
        },
      ]
    : []

  return {
    courseFilter,
    sectionFilter,
    projectFilter,
    mentorFilter,
    teamProjectFilter,
    participantFilter,
  }
}

export default class GradeSheetRepository extends Repository {
  async getParticipantGradeSheets(
    userId: mongoose.Types.ObjectId,
  ): Promise<GradeSheet[]> {
    const filter = {
      participants: { $elemMatch: { participantID: userId } },
    }
    const projection = {
      _id: 0,
      projectID: 1,
      participants: { $elemMatch: { participantID: userId } },
      mentorID: 1,
      reviewers: 1,
      mentorGrades: 1,
      mentorReviewerGrades: 1,
    }
    return this.model.find(filter, projection)
  }

  async getGradeSheets(filters: GradeSheetFilters) {
    const {
      teamProjectFilter,
      mentorFilter,
      projectFilter,
      sectionFilter,
      courseFilter,
      participantFilter,
    } = createFilters(filters)
    return this.model.aggregate([
      ...teamProjectFilter,
      ...mentorFilter,
      lookupTeamProject,
      ...projectFilter,
      lookupParentProject,
      ...sectionFilter,
      lookupSection,
      ...courseFilter,
      lookupMentor,
      lookupParticipants,
      ...participantFilter,
      lookupReviewers,
      {
        $project: {
          _id: 1,
          project: {
            _id: 1,
            projectName: 1,
            projectUrl: 1,
            description: 1,
          },
          mentor: {
            _id: 1,
            name: 1,
            surname: 1,
          },
          mentorGrades: 1,
          reviewers: 1,
          mentorReviewerGrades: 1,
          participantData: 1,
          section: {
            _id: 1,
            name: 1,
          },
        },
      },
    ])
  }

  async getAllByCourse(courseId: string) {
    return this.getGradeSheets({ courseId })
  }

  async getGradeSheet(id: mongoose.Types.ObjectId) {
    return this.model.aggregate([
      {
        $match: { _id: id },
      },
      lookupTeamProject,
      lookupParentProject,
      lookupSection,
      lookupMentor,
      lookupParticipants,
      lookupReviewers,
      {
        $project: {
          _id: 1,
          project: {
            _id: 1,
            projectName: 1,
            projectUrl: 1,
            description: 1,
          },
          mentor: {
            _id: 1,
            name: 1,
            surname: 1,
          },
          mentorGrades: 1,
          reviewers: 1,
          mentorReviewerGrades: 1,
          participantData: {
            _id: 1,
            name: 1,
            surname: 1,
          },
          participants: 1,
          section: {
            _id: 1,
            name: 1,
          },
        },
      },
    ])
  }

  async getReviewerGradeSheets(
    userId: mongoose.Types.ObjectId,
  ): Promise<GradeSheet[]> {
    const filter = {
      reviewers: userId,
    }
    const projection = {
      _id: 0,
      mentorID: 1,
      'participants.participantID': 1,
      'participants.role': 1,
      mentorReviewerGrades: { $elemMatch: { mentorID: userId } },
    }
    return this.model.find(filter, projection)
  }

  async addMentorReviewer(
    gradeSheetId: mongoose.Types.ObjectId,
    mentorId: mongoose.Types.ObjectId,
  ) {
    const sheet = (await this.getById(gradeSheetId)) as
      | (GradeSheet & mongoose.Document)
      | null
    if (sheet === null) return null
    if (sheet.reviewers.includes(mentorId)) return sheet
    sheet.reviewers.push(mentorId)
    sheet.mentorReviewerGrades.push({ mentorID: mentorId, grades: {} })
    return await sheet.save()
  }
}
