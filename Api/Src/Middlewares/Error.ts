import * as express from "express";

class JSONParseError extends SyntaxError {
    status: number;
}

export default (err: JSONParseError, req: express.Request, res: express.Response, next: express.NextFunction ) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(500).json({message: 'Invalid JSON'});
    }
    next();
}
