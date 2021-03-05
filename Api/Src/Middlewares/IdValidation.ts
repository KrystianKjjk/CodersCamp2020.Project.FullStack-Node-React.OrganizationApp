import * as express from "express";
import * as mongoose from 'mongoose';

const idValidation = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    //check if id exists, if yes then check if it's of objectId type, otherwise throw an error
    if (!req.params.id) next(); 
    try {
        new mongoose.Types.ObjectId(req.params.id);
        next();
    }
    catch (error) {
        return res.status(400).json({message: "error.message"})
    }
}

export default idValidation;