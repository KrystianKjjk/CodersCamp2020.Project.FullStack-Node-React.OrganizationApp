import * as express from 'express';

import User, {UserType} from "../Models/User";
import TeamService from "../Services/TeamService";
import AuthService from "../Services/AuthService";


export default class AuthGradeController {

    constructor(private teamService: TeamService, private authService: AuthService) {}

    authGetGradeById = async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
        const tokenObj = this.authService.getTokenDataReq(req);

        next();
    }
}
