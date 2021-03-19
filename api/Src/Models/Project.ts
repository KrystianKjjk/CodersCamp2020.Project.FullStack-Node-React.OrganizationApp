//Jest to propozycja projektu tworzona przez administratora CodersCamp. 
//Przy rozpoczynaniu konkretnego projektu mentor musi utworzyc TeamProject.
import * as mongoose from 'mongoose';

export interface Project {
    _id: mongoose.ObjectId,
    sectionId: number,
    projectName: string,
    projectUrl: string,
    description?: string
}

const ProjectSchema = new mongoose.Schema({
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