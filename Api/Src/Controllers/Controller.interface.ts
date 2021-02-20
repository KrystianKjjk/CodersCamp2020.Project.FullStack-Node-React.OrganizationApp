import * as express from 'express';

interface IController {
    path: string;
    router: express.Router;
}

export default IController;