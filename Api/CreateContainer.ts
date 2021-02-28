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

import PasswordResetTokenModel from './Src/Models/PasswordResetToken';
import PasswordService from './Src/Services/Password';
import PasswordController from './Src/Controllers/Password';
import PasswordRoutes from './Src/Routes/Password';
import { Repository } from './Src/Repositories/Repository';

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
appContainer.declare('PasswordResetTokenModel', (c) => PasswordResetTokenModel);

// Repositories
appContainer.declare('UserRepository', (c) => new UserRepository(c.UserModel));
appContainer.declare('PasswordResetTokenRepository', (c) => new Repository(c.PasswordResetTokenModel));

// Services
appContainer.declare("UserService", (c) => new UserService(c.UserRepository));
appContainer.declare("PasswordService", (c) => new PasswordService(c.UserRepository, c.PasswordResetTokenRepository));

// Controllers
appContainer.declare("UserController", (c) => new UserController(c.UserService));
appContainer.declare("PasswordController", (c) => new PasswordController(c.MailingService, c.PasswordService));

// Routes
appContainer.declare("Routes", (c) => [
  userRoutes(c.UserController),
  PasswordRoutes(c.PasswordController)
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