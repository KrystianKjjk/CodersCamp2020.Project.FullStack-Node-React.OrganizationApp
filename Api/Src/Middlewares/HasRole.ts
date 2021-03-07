import { UserType } from "../Models/User";
import * as express from 'express';
const jwt = require('jsonwebtoken');

export const HasRole = (roles: UserType[]) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token: string = req.header('x-auth-token');
    if(!token) return res.status(401).json({message: 'UNAUTHORIZED'});

    try {
        const payload = jwt.decode(token);
        return roles.includes(payload.type) ? next() : res.status(403).json({message: 'FORBIDDEN'});
    }
    catch {
        res.status(400).json({message: 'INVALID TOKEN'});
    }

}
