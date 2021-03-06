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
import UserRepository from './Src/Repositories/User';
import UserService from './Src/Services/User';
import UserController from './Src/Controllers/User';
import userRoutes from './Src/Routes/User';
import ErrorMiddleware from './Src/Middlewares/Error';

import AuthService from "./Src/Services/AuthService";
import AuthController from "./Src/Controllers/AuthController";
import authRoutes from "./Src/Routes/AuthRoutes";

import gradeRoutes from "./Src/Routes/GradeRoutes";
import GradeController from "./Src/Controllers/GradeController";
import GradeService from "./Src/Services/GradeService";
import GradeRepository from "./Src/Repositories/GradeRepository";
import GradeModel from "./Src/Models/Grade";

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
appContainer.declare('CourseModel', (c) => CourseModel);
appContainer.declare("Project", (c) => Project);
appContainer.declare("Grade", (c) => GradeModel);


// Repositories
appContainer.declare('UserRepository', (c) => new UserRepository(c.UserModel));
appContainer.declare('CourseRepository', (c) => new CourseRepository(c.CourseModel));
appContainer.declare("ProjectRepository", (c) => new ProjectRepository(c.Project));
appContainer.declare("GradeRepository", (c) => new GradeRepository(c.Grade));


// Services
appContainer.declare("MailingService", (c) => new MailingService(nodemailer));
appContainer.declare("UserService", (c) => new UserService(c.UserRepository));
appContainer.declare("CourseService", (c)=>new CourseService(c.CourseRepository));
appContainer.declare("ProjectService", (c) => new ProjectService(c.ProjectRepository));
appContainer.declare("AuthService", (c) => new AuthService(c.UserRepository, c.jwtKey, c.jwtExpiresIn));
appContainer.declare("GradeService", (c) => new GradeService(c.GradeRepository));


// Controllers
appContainer.declare("UserController", (c) => new UserController(c.UserService));
appContainer.declare("CourseController",(c)=> new CourseController(c.CourseService));
appContainer.declare("ProjectController", (c) => new ProjectController(c.ProjectService));
appContainer.declare("AuthController", (c) => new AuthController(c.AuthService));
appContainer.declare("GradeController", (c) => new GradeController(c.GradeService));


appContainer.declare("Routes", (c) => [
    userRoutes(c.UserController),
    authRoutes(c.AuthController),
    courseRoutes(c.CourseController),
    projectRoutes(c.ProjectController),
    gradeRoutes(c.GradeController)
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
