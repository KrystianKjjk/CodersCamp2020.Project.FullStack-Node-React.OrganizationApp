import * as express from 'express';

interface Controller {
    path: string;
    router: express.Router;
}

export default Controller;