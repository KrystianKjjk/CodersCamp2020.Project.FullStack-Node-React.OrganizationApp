import Container from './Container';
import MailingService from './Src/Services/MailingService'
import App from './App';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

import ProjectController from './Src/Controllers/ProjectController';
import projectRoutes from './Src/Routes/ProjectRoutes';
import ProjectService from './Src/Services/ProjectService';
import ProjectRepository from './Src/Repositories/ProjectRepository';
import Project from './Src/Models/Project';

import courseRoutes from './Src/Routes/CourseRoute';
import CourseController from './Src/Controllers/CourseController';
import CourseService from './Src/Services/CourseService';
import CourseModel from './Src/Models/Course';
import CourseRepository from './Src/Repositories/CourseRepository';

import UserModel from './Src/Models/User';
import UserRepository from './Src/Repositories/UserRepository';
import UserService from './Src/Services/UserService';
import UserController from './Src/Controllers/UserController';
import userRoutes from './Src/Routes/UserRoutes';

import GradeSheetModel from './Src/Models/GradeSheet';
import GradeSheetRepository from './Src/Repositories/GradeSheetRepository';
import GradeSheetService from './Src/Services/GradeSheetService';
import GradeSheetController from './Src/Controllers/GradeSheetController';
import gradeSheetRoutes from './Src/Routes/GradeSheetRoutes';

import PasswordResetTokenModel from './Src/Models/PasswordResetToken';
import PasswordService from './Src/Services/PasswordService';
import PasswordController from './Src/Controllers/PasswordController';
import PasswordRoutes from './Src/Routes/PasswordRoutes';
import { Repository } from './Src/Repositories/Repository';

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

//error handler
appContainer.declare("ErrorMiddleware", (c) => new ErrorMiddleware());

// Middlewares
const middlewares = [
    bodyParser.json()
];
appContainer.declare("Middlewares", (c) => middlewares);

// Models
appContainer.declare('UserModel', (c) => UserModel);
appContainer.declare('PasswordResetTokenModel', (c) => PasswordResetTokenModel);
appContainer.declare('CourseModel', (c) => CourseModel);
appContainer.declare("Project", (c) => Project);
appContainer.declare("GradeSheetModel", (c) => GradeSheetModel);

// Repositories
appContainer.declare('UserRepository', (c) => new UserRepository(c.UserModel));
appContainer.declare('CourseRepository', (c) => new CourseRepository(c.CourseModel));
appContainer.declare("ProjectRepository", (c) => new ProjectRepository(c.Project));
appContainer.declare("GradeSheetRepository", (c) => new GradeSheetRepository(c.GradeSheetModel));
appContainer.declare('PasswordResetTokenRepository', (c) => new Repository(c.PasswordResetTokenModel));

// Services
appContainer.declare("MailingService", (c) => new MailingService(nodemailer));
appContainer.declare("UserService", (c) => new UserService(c.UserRepository));
appContainer.declare("PasswordService", (c) => new PasswordService(c.UserRepository, c.PasswordResetTokenRepository));
appContainer.declare("CourseService", (c)=>new CourseService(c.CourseRepository));
appContainer.declare("ProjectService", (c) => new ProjectService(c.ProjectRepository));
appContainer.declare("GradeSheetService", (c) => new GradeSheetService(c.GradeSheetRepository));
appContainer.declare("AuthService", (c) => new AuthService(c.UserRepository, c.jwtKey, c.jwtExpiresIn));

// Controllers
appContainer.declare("UserController", (c) => new UserController(c.UserService));
appContainer.declare("PasswordController", (c) => new PasswordController(c.MailingService, c.PasswordService));
appContainer.declare("CourseController",(c)=> new CourseController(c.CourseService));
appContainer.declare("ProjectController", (c) => new ProjectController(c.ProjectService));
appContainer.declare("GradeSheetController", (c) => new GradeSheetController(c.GradeSheetService));
appContainer.declare("AuthController", (c) => new AuthController(c.AuthService));

appContainer.declare("Routes", (c) => [
  userRoutes(c.UserController),
  PasswordRoutes(c.PasswordController),
  courseRoutes(c.CourseController),
  projectRoutes(c.ProjectController),
  gradeSheetRoutes(c.GradeSheetController),
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
          c.Port,
          c.ErrorMiddleware
      )
);

export default appContainer;
