import Container from './Container'
import MailingService from './Src/Services/MailingService'
import 'dotenv/config'
import 'express-async-errors'
import * as cookieParser from 'cookie-parser'
import App from './App'
import * as express from 'express'
import * as nodemailer from 'nodemailer'
import 'dotenv/config'
import 'express-async-errors'
import * as cors from 'cors'

import ProjectController from './Src/Controllers/ProjectController'
import projectRoutes from './Src/Routes/ProjectRoutes'
import ProjectService from './Src/Services/ProjectService'
import ProjectRepository from './Src/Repositories/ProjectRepository'
import Project from './Src/Models/Project'

import courseRoutes from './Src/Routes/CourseRoute'
import CourseController from './Src/Controllers/CourseController'
import CourseService from './Src/Services/CourseService'
import CourseModel from './Src/Models/Course'
import CourseRepository from './Src/Repositories/CourseRepository'

import UserModel from './Src/Models/User'
import UserRepository from './Src/Repositories/UserRepository'
import UserService from './Src/Services/UserService'
import UserController from './Src/Controllers/UserController'
import userRoutes from './Src/Routes/UserRoutes'

import GradeSheetModel from './Src/Models/GradeSheet'
import GradeSheetRepository from './Src/Repositories/GradeSheetRepository'
import GradeSheetService from './Src/Services/GradeSheetService'
import GradeSheetController from './Src/Controllers/GradeSheetController'
import gradeSheetRoutes from './Src/Routes/GradeSheetRoutes'

import ErrorMiddleware from './Src/Middlewares/Error'

import PasswordResetTokenModel from './Src/Models/PasswordResetToken'
import PasswordService from './Src/Services/PasswordService'
import PasswordController from './Src/Controllers/PasswordController'
import PasswordRoutes from './Src/Routes/PasswordRoutes'
import { Repository } from './Src/Repositories/Repository'

import AuthService from './Src/Services/AuthService'
import AuthController from './Src/Controllers/AuthController'
import authRoutes from './Src/Routes/AuthRoutes'

import SectionModel, { Test } from './Src/Models/Section'
import SectionRepository from './Src/Repositories/SectionRepository'
import SectionService from './Src/Services/SectionService'
import SectionController from './Src/Controllers/SectionController'
import sectionRoutes from './Src/Routes/SectionRoutes'

import TestService from './Src/Services/TestService'
import TestController from './Src/Controllers/TestController'

import TeamProjectModel from './Src/Models/TeamProject'
import TeamProjectRepository from './Src/Repositories/TeamProjectRepository'
import TeamProjectService from './Src/Services/TeamProjectService'
import TeamProjectController from './Src/Controllers/TeamProjectController'
import teamProjectRoutes from './Src/Routes/TeamProjectRoute'

import teamsRoutes from './Src/Routes/TeamRoutes'
import TeamController from './Src/Controllers/TeamController'
import TeamService from './Src/Services/TeamService'
import Team from './Src/Models/Team'
import TeamRepository from './Src/Repositories/TeamRepository'

import gradeRoutes from './Src/Routes/GradeRoutes'
import GradeController from './Src/Controllers/GradeController'
import GradeService from './Src/Services/GradeService'
import GradeModel from './Src/Models/Grade'

import AuthGradeController from './Src/Controllers/GradeAuthController'

import materialRoutes from './Src/Routes/MaterialRoutes'
import MaterialController from './Src/Controllers/MaterialController'
import MaterialService from './Src/Services/MaterialService'
import MaterialRepository from './Src/Repositories/MaterialRepository'
import MaterialModel from './Src/Models/Material'

const appContainer = new Container()

// JWT .ENV
appContainer.declare('jwtKey', (c) => process.env.JWT_PRIVATE_KEY)
appContainer.declare('jwtExpiresIn', (c) => process.env.JWT_TOKEN_EXPIRESIN)

appContainer.declare(
  'jwtRefreshKey',
  (c) => process.env.JWT_REFRESH_PRIVATE_KEY,
)
appContainer.declare(
  'jwtRefreshExpiresIn',
  (c) => process.env.JWT_REFRESH_EXPIRESIN,
)

// Mongo config
appContainer.declare('Port', (c) => process.env.PORT)
appContainer.declare('MongoUrl', (c) => process.env.MONGO_URL)

//error handler
appContainer.declare('ErrorMiddleware', (c) => new ErrorMiddleware())

// Middlewares
const middlewares = [
  express.json(),
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
  cookieParser(),
]
appContainer.declare('Middlewares', (c) => middlewares)

// Models
appContainer.declare('UserModel', (c) => UserModel)
appContainer.declare('CourseModel', (c) => CourseModel)
appContainer.declare('TeamProjectModel', (c) => TeamProjectModel)
appContainer.declare("Project", (c) => Project)
appContainer.declare("GradeSheetModel", (c) => GradeSheetModel)
appContainer.declare("Section", (c) => SectionModel)
appContainer.declare("Team", (c) => Team)
appContainer.declare('PasswordResetTokenModel', (c) => PasswordResetTokenModel)
appContainer.declare("Grade", (c) => GradeModel)
appContainer.declare("Material", (c) => MaterialModel)
appContainer.declare("Test", (c) => Test)


// Repositories
appContainer.declare('UserRepository', (c) => new UserRepository(c.UserModel))
appContainer.declare('CourseRepository', (c) => new CourseRepository(c.CourseModel))
appContainer.declare('TeamProjectRepository', (c) => new TeamProjectRepository(c.TeamProjectModel))
appContainer.declare("ProjectRepository", (c) => new ProjectRepository(c.Project))
appContainer.declare("GradeSheetRepository", (c) => new GradeSheetRepository(c.GradeSheetModel))
appContainer.declare("SectionRepository", (c) => new SectionRepository(c.Section))
appContainer.declare("TeamRepository", (c) => new TeamRepository(c.Team))
appContainer.declare('PasswordResetTokenRepository', (c) => new Repository(c.PasswordResetTokenModel))
appContainer.declare("MaterialRepository", (c) => new MaterialRepository(c.Material))

// Services
appContainer.declare("MailingService", (c) => new MailingService(nodemailer))
appContainer.declare("UserService", (c) => new UserService(c.UserRepository))
appContainer.declare("PasswordService", (c) => new PasswordService(c.UserRepository, c.PasswordResetTokenRepository))
appContainer.declare("CourseService", (c) => new CourseService(c.CourseRepository))
appContainer.declare("TeamProjectService", (c) => new TeamProjectService(c.TeamProjectRepository, c.TeamRepository))
appContainer.declare("ProjectService", (c) => new ProjectService(c.ProjectRepository))
appContainer.declare("GradeSheetService", (c) => new GradeSheetService(c.GradeSheetRepository))
appContainer.declare("SectionService", (c) => new SectionService(c.SectionRepository))
appContainer.declare("TeamService", (c) => new TeamService(c.TeamRepository))
appContainer.declare("GradeService", (c) => new GradeService(c.UserService))
appContainer.declare("MaterialService", (c) => new MaterialService(c.MaterialRepository, c.SectionService))
appContainer.declare("TestService", (c) => new TestService(c.SectionRepository))
appContainer.declare('AuthService',(c) =>new AuthService(c.UserRepository,c.jwtKey,c.jwtExpiresIn,c.jwtRefreshKey,c.jwtRefreshExpiresIn,))

// Controllers
appContainer.declare("UserController", (c) => new UserController(c.UserService, c.MailingService, c.TeamService))
appContainer.declare("PasswordController", (c) => new PasswordController(c.MailingService, c.PasswordService))
appContainer.declare("CourseController", (c) => new CourseController(c.CourseService))
appContainer.declare("TeamProjectController", (c) => new TeamProjectController(c.TeamProjectService))
appContainer.declare("ProjectController", (c) => new ProjectController(c.ProjectService))
appContainer.declare("GradeSheetController", (c) => new GradeSheetController(c.GradeSheetService))
appContainer.declare("SectionController", (c) => new SectionController(c.SectionService))
appContainer.declare("TeamController", (c) => new TeamController(c.TeamService))
appContainer.declare("AuthController", (c) => new AuthController(c.AuthService, c.MailingService))
appContainer.declare("GradeController", (c) => new GradeController(c.GradeService))
appContainer.declare("MaterialController", (c) => new MaterialController(c.MaterialService))
appContainer.declare("TestController", (c) => new TestController(c.TestService, c.SectionService))
appContainer.declare("AuthGradeController", (c) => new AuthGradeController(c.TeamService, c.AuthService, c.UserService))


appContainer.declare("Routes", (c) => [
  userRoutes(c.UserController),
  PasswordRoutes(c.PasswordController),
  courseRoutes(c.CourseController),
  projectRoutes(c.ProjectController),
  sectionRoutes(c.SectionController, c.TestController),
  gradeSheetRoutes(c.GradeSheetController),
  authRoutes(c.AuthController),
  teamProjectRoutes(c.TeamProjectController),
  teamsRoutes(c.TeamController),
  gradeRoutes(c.GradeController, c.AuthGradeController),
  materialRoutes(c.MaterialController),
])

// Create router
type Routes = (router: express.Router) => express.Router
appContainer.declare('Router', (c) =>
  c.Routes.reduce(
    (router: express.Router, addRoutes: Routes) => addRoutes(router),
    express.Router(),
  ),
)

// Create App
appContainer.declare(
  'App',
  (c) =>
    new App(
      c.jwtKey,
      c.MongoUrl,
      c.Middlewares,
      c.Router,
      c.Port,
      c.ErrorMiddleware,
    ),
)

export default appContainer
