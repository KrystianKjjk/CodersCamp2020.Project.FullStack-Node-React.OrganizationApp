import * as mongoose from 'mongoose';

export interface Teams {

};

const TeamsSchema = new mongoose.Schema({
    

  }, {timestamps: true});

  export default mongoose.model<Teams & mongoose.Document>('Teams', TeamsSchema);