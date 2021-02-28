import * as mongoose from 'mongoose';

export interface PasswordResetTokenModel{
    userId: String,
    token: String,
    createdAt: Date
}

const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

export default mongoose.model<PasswordResetTokenModel & mongoose.Document>('PasswordResetToken', tokenSchema);