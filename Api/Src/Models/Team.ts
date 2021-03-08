import * as mongoose from 'mongoose';

export interface Team {
    _id: mongoose.Types.ObjectId,
    mentor: mongoose.Types.ObjectId;
    users: mongoose.Types.ObjectId[];
    projects: mongoose.Types.ObjectId[];
};

const TeamSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
    }],

  }, {timestamps: true});

  export default mongoose.model<Team & mongoose.Document>('Team', TeamSchema);