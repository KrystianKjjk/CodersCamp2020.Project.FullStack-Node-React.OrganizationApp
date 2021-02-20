import IRoutesGroup from './RoutesGroup.interface';
import * as express from 'express';

function getHelloWorld(req: express.Request, res: express.Response, next?: express.NextFunction){
    res.status(200).json({msg: 'Hello World'});
}
const helloWorld = {
    path: 'hello/world/',
    handler: getHelloWorld
}
const helloWorldParam = {
    param: 'world',
    handler: (req: express.Request, res: express.Response, next?: express.NextFunction) => {
        const world = req.params.world
        res.status(200).json({msg: 'Hello ' + world});
    }
}


const sampleRoutes = {
    get: [helloWorld, helloWorldParam]
};
export default sampleRoutes;