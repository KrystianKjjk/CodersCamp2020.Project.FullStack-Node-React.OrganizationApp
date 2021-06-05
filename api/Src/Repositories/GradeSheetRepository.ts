import { GradeSheet } from '../Models/GradeSheet'
import { Repository } from './Repository'
import * as mongoose from 'mongoose'
import * as _ from 'lodash'

export interface GradeSheetFilters {
  id?: string
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
    id,
    sectionId,
    projectId,
    teamProjectId,
    courseId,
    mentorId,
    participantId,
    mentorReviewerId,
  } = filters

  const idFilter = id
    ? [
        {
          $match: { _id: new mongoose.mongo.ObjectID(id) },
        },
      ]
    : []

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

  const reviewerFilter = mentorReviewerId
    ? [
        {
          $match: {
            reviewers: new mongoose.mongo.ObjectID(mentorReviewerId),
          },
        },
      ]
    : []

  return {
    idFilter,
    courseFilter,
    sectionFilter,
    projectFilter,
    mentorFilter,
    teamProjectFilter,
    participantFilter,
    reviewerFilter,
  }
}

const gradeSheetDetailsProjection = {
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
}

const gradeSheetProjection = {
  $project: _.pick(gradeSheetDetailsProjection.$project, [
    '_id',
    'project',
    'mentor',
  ]),
}

export default class GradeSheetRepository extends Repository {
  async find(filters: GradeSheetFilters) {
    const {
      idFilter,
      teamProjectFilter,
      mentorFilter,
      projectFilter,
      sectionFilter,
      courseFilter,
      participantFilter,
      reviewerFilter,
    } = createFilters(filters)
    return this.model.aggregate([
      ...idFilter,
      ...teamProjectFilter,
      ...mentorFilter,
      ...reviewerFilter,
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
      filters.id ? gradeSheetDetailsProjection : gradeSheetProjection,
    ])
  }

  async getAllByCourse(courseId: string) {
    return this.find({ courseId })
  }

  async getGradeSheet(id: string) {
    return this.find({ id })
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
