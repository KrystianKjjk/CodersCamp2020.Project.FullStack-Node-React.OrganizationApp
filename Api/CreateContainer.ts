import Container from './Container';
import App from './App';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import 'dotenv/config';

import UserModel from './Src/Models/User';
import UserRepository from './Src/Repositories/User';
import UserService from './Src/Services/User';
import UserController from './Src/Controllers/User';
import userRoutes from './Src/Routes/User';
import errorHandler from './Src/Middlewares/ErrorHandler';

const appContainer = new Container();

// Mongo config
appContainer.declare("Port", (c) => process.env.PORT);
appContainer.declare("MongoUrl", (c) => process.env.MONGO_URL);

//error handler
appContainer.declare("ErrorHandler", (c) => new errorHandler());

// Middlewares
const middlewares = [
  bodyParser.json()
];
appContainer.declare("Middlewares", (c) => middlewares);

// Models
appContainer.declare('UserModel', (c) => UserModel);

// Repositories
appContainer.declare('UserRepository', (c) => new UserRepository(c.UserModel));

// Services
appContainer.declare("UserService", (c) => new UserService(c.UserRepository));

// Controllers
appContainer.declare("UserController", (c) => new UserController(c.UserService));

// Routes
appContainer.declare("Routes", (c) => [
  userRoutes(c.UserController)
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
          c.Port,
          c.ErrorHandler
      )
);

export default appContainer;
