import IController from './Controller.interface';
import * as express from 'express';
import {Rout, IRoutesGroup} from '../Routes/RoutesGroup.interface';

class Controller implements IController {
  public path: string;
  public router: express.Router;
  
  constructor(path: string, routes: IRoutesGroup) {
    this.path = path;
    this.intializeRoutes(routes);
  }

  public intializeRoutes(routes: IRoutesGroup) {
    for (const method in routes) {
        routes[method].forEach((rout: Rout) => {
            const param = rout.param ? '/:' + rout.param : '';
            this.router[method](this.path + param, rout);
        })
    }
  }
}

export default Controller;