import Container from './Container';
import App from './App';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import 'dotenv/config';
import courseRoutes from './Src/Routes/CourseRoute';
import CourseController from './Src/Controllers/CourseController';
import CourseService from './Src/Services/CourseService';
import CourseModel from './Src/Models/Course';
import CourseRepository from './Src/Repositories/CourseRepository';

import UserModel from './Src/Models/User';
import UserRepository from './Src/Repositories/User';
import UserService from './Src/Services/User';
import UserController from './Src/Controllers/User';
import userRoutes from './Src/Routes/User';

const appContainer = new Container();

// Mongo config
appContainer.declare("Port", (c) => process.env.PORT);
appContainer.declare("MongoUrl", (c) => process.env.MONGO_URL);

// Middlewares
const middlewares = [
  bodyParser.json()
];
appContainer.declare("Middlewares", (c) => middlewares);

// Models
appContainer.declare('UserModel', (c) => UserModel);
appContainer.declare('CourseModel', (c) => CourseModel);


// Repositories
appContainer.declare('UserRepository', (c) => new UserRepository(c.UserModel));
appContainer.declare('CourseRepository', (c) => new CourseRepository(c.CourseModel));

// Services
appContainer.declare("UserService", (c) => new UserService(c.UserRepository));
appContainer.declare("CourseService", (c)=>new CourseService(c.CourseRepository));

// Controllers
appContainer.declare("UserController", (c) => new UserController(c.UserService));
appContainer.declare("CourseController",(c)=> new CourseController(c.CourseService));

// Routes
appContainer.declare("Routes", (c) => [
  userRoutes(c.UserController),
  courseRoutes(c.CourseController)
]);

// Create router
type Routes = (router: express.Router) => express.Router;
appContainer.declare( "Router", (c) =>  c.Routes.reduce( (router: express.Router, addRoutes: Routes) => addRoutes(router), express.Router() ) );

// Create App
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