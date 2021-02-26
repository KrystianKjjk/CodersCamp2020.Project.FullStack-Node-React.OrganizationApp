import Container from './Container';
import SampleController from './Src/Controllers/SampleController';
import sampleRoutes from './Src/Routes/SampleRoutes';
import SampleService from './Src/Services/SampleService';
import App from './App';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import 'dotenv/config';
import ProjectController from './Src/Controllers/ProjectController';
import projectRoutes from './Src/Routes/ProjectRoutes';
import ProjectService from './Src/Services/ProjectService';
import ProjectRepository from './Src/Repositories/ProjectRepository';
import Project from './Src/Models/Project';

const appContainer = new Container();
// Mongo config
appContainer.declare("Port", (c) => process.env.PORT);
appContainer.declare("MongoUrl", (c) => process.env.MONGO_URL);
// Models
appContainer.declare("Project", (c) => new Project());
// Middlewares
const middlewares = [
  bodyParser.json()
];
appContainer.declare("Middlewares", (c) => middlewares);
//Repositories
appContainer.declare("ProjectRepository", (c) => new ProjectRepository(c.Project));
// Services
appContainer.declare("SampleService", (c) => new SampleService());
appContainer.declare("ProjectService", (c) => new ProjectService(c.ProjectRepository));
// Controllers
appContainer.declare("SampleController", (c) => new SampleController(c.SampleService));
appContainer.declare("ProjectController", (c) => new ProjectController(c.ProjectService));
// Routes
appContainer.declare("Routes", c => [
  sampleRoutes(c.SampleController),
  projectRoutes(c.ProjectController),
]);
// Create router
type Routes = (router: express.Router) => express.Router;
appContainer.declare( "Router", (c) =>  c.Routes.reduce( (router: express.Router, addRoutes: Routes) => addRoutes(router), express.Router() ) );
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