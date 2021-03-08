import * as express from 'express';

import User from "../Models/User";
import TeamService from "../Services/TeamService";
import AuthService from "../Services/AuthService";


export default class AuthGradeController {

    constructor(private teamService: TeamService, private authService: AuthService) {}

    gradeAuthorize = async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
        const tokenObj = this.authService.getTokenDataReq(req);
        if(!tokenObj || tokenObj.include) return res.status(401).json({message: 'UNAUTHORIZED'});
    }
}
