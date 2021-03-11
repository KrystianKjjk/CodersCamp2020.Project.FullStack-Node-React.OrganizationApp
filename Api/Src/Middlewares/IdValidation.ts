import * as express from "express";
import * as mongoose from 'mongoose';

const idValidation = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    //check if id is of objectId type, otherwise throw an error
    try {
        new mongoose.Types.ObjectId(req.params.id);
        next()
    }
    catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export const idsValidation = (ids: string[] = ['*']) => (req:express.Request, res:express.Response, next:express.NextFunction) => {
    //check if id is of objectId type, otherwise throw an error
    try {
        if (ids[0] === '*') ids = Object.keys(req.params);
        for (let i in ids)
            new mongoose.Types.ObjectId(req.params[ids[i]]);
        next()
    }
    catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export default idValidation;