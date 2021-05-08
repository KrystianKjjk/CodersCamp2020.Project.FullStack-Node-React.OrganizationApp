//Wspolne dla uczestnikow przypisanych do konkretnego mentora, poniewaz kazda grupa moze robic inny projekt.
//Przy rozpoczynaniu projektu mentor tworzy team project.
import * as mongoose from 'mongoose'

export interface TeamProject {
  _id: mongoose.Types.ObjectId
  teamId: mongoose.Types.ObjectId
  parentProjectId: mongoose.Types.ObjectId
  projectName: string
  projectUrl: string
  description?: string
}

const TeamProjectSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    parentProjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
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

export default mongoose.model<TeamProject & mongoose.Document>(
  'TeamProject',
  TeamProjectSchema,
)
