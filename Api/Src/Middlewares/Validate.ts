import * as express from "express";

export default (validator) => ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
        const result = validator(req.body);
        return !result.error ? next() : res.status(400).json( {message: result.error.details[0].message} );
    }
