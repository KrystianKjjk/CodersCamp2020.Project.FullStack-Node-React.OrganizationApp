import * as express from 'express';

export interface Rout {
    param?: string;
    handler: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
}

export interface IRoutesGroup {
    get?: Rout[]
    post?: Rout[];
    put?: Rout[];
    delete?: Rout[];
    patch?: Rout[];
}

export default IRoutesGroup;