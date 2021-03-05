//Wspolne dla uczestnikow przypisanych do konkretnego mentora, poniewaz kazda grupa moze robic inny projekt
import * as mongoose from 'mongoose';

export interface Project {
    _id: mongoose.ObjectId,
    teamId?: mongoose.ObjectId,
    parentProjectId?: mongoose.ObjectId,
    sectionId: number,
    projectName: string,
    projectUrl: string,
    description?: string
}

const ProjectSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams'
    },
    parentProjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    sectionId: {
        type: Number, 
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
    }
  }, {timestamps: true});

  export default mongoose.model<Project & mongoose.Document>('Project', ProjectSchema);