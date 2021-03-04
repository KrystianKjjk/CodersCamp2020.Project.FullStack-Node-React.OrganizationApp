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

import AuthService from "./Src/Services/AuthService";
import AuthController from "./Src/Controllers/AuthController";
import authRoutes from "./Src/Routes/AuthRoutes";

const appContainer = new Container();

// JWT .ENV
appContainer.declare("jwtKey", (c) => process.env.JWT_PRIVATE_KEY);
appContainer.declare("jwtExpiresIn", (c) => process.env.JWT_TOKEN_EXPIRESIN);

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

// Repositories
appContainer.declare('UserRepository', (c) => new UserRepository(c.UserModel));

// Services
appContainer.declare("UserService", (c) => new UserService(c.UserRepository));
appContainer.declare("AuthService", (c) => new AuthService(c.UserRepository, c.jwtKey, c.jwtExpiresIn));

// Controllers
appContainer.declare("UserController", (c) => new UserController(c.UserService));
appContainer.declare("AuthController", (c) => new AuthController(c.AuthService));

// Routes
appContainer.declare("Routes", (c) => [
    userRoutes(c.UserController),
    authRoutes(c.AuthController)
]);

// Create router
type Routes = (router: express.Router) => express.Router;
appContainer.declare( "Router", (c) =>  c.Routes.reduce( (router: express.Router, addRoutes: Routes) => addRoutes(router), express.Router() ) );

// Create App
appContainer.declare(
  "App",
  (c) =>
      new App(
          c.jwtKey,
          c.MongoUrl,
          c.Middlewares,
          c.Router,
          c.Port
      )
);

export default appContainer;
