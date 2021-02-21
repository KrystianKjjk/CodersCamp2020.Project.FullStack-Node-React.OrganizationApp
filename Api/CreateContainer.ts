import Container from './Container';
import SampleController from './Src/Controllers/SampleController';
import sampleRoutes from './Src/Routes/SampleRoutes';
import SampleService from './Src/Services/SampleService';
import App from './App';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import 'dotenv/config';

const appContainer = new Container();
// Mongo config
appContainer.declare("Port", (c) => process.env.PORT);
appContainer.declare("MongoUrl", (c) => process.env.MONGO_URL);
// Middlewares
const middlewares = [bodyParser.json()];
appContainer.declare("Middlewares", (c) => middlewares);
// Services
appContainer.declare("SampleService", (c) => new SampleService());
// Controllers
appContainer.declare("SampleController", (c) => new SampleController(c.SampleService));
// Routes
appContainer.declare("Routes", c => [(router: express.Router) => sampleRoutes(router, c.SampleController)]);
// Create router
appContainer.declare( "Router", (c) => {
  const router = express.Router();
  c.Routes.forEach((routes: (router: express.Router) => void) => {
    routes(router);
  });
  return router;
});
appContainer.declare(
  "App",
  (c) =>
      new App(
          c.MongoUrl,
          c.Middlewares,
          c.Router,
          c.Port
      )
);

export default appContainer;