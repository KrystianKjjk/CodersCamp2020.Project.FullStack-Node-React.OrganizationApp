//Jest to propozycja projektu tworzona przez administratora CodersCamp.
//Przy rozpoczynaniu konkretnego projektu mentor musi utworzyc TeamProject.
import * as mongoose from 'mongoose'
import { SchemaTypes } from 'mongoose'

export interface Project {
  _id: mongoose.ObjectId
  sectionId: mongoose.Types.ObjectId
  projectName: string
  projectUrl: string
  description?: string
}

const ProjectSchema = new mongoose.Schema(
  {
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
)

export default mongoose.model<Project & mongoose.Document>(
  'Project',
  ProjectSchema,
)
