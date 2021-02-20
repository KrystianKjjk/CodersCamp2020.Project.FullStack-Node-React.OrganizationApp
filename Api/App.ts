import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import 'dotenv/config';
import Container from './Container';
import Controller from './Src/Controllers/Controller';
import sampleRoute from './Src/Routes/SampleRoutes';

class App {
  public app: express.Application;
  private port: string;
 
  constructor(mongoUrl: string, middlewares: any[], controllers: Controller[], port: string) {
    this.app = express();
    this.port = port;
    this.connectToTheDatabase(mongoUrl);
    this.initializeMiddlewares(middlewares);
    this.initializeControllers(controllers);
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
  
  private connectToTheDatabase(mongoUrl: string) {
    mongoose.connect(mongoUrl);
  }
  
  private initializeMiddlewares(middlewares: any[]) {
    middlewares.forEach(middleware => {
      this.app.use(middleware);
    })
  }
  
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

}

const appContainer = new Container();
appContainer.declare('Port', c => process.env.PORT);
appContainer.declare('MongoUrl', c => process.env.MONGO_URL);
const middlewares = [ 
  bodyParser.json() 
];
appContainer.declare('Middlewares', c => middlewares);
const controllers = [
  new Controller('/hello/world', sampleRoute)
];
appContainer.declare('Controllers', c => controllers);
appContainer.declare('App', c => new App(c.MongoUrl, c.Middlewares, c.Controllers, c.Port));

export default appContainer;