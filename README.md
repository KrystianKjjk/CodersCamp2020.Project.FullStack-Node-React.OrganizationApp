
# Coders Camp Organization App
***The app built to help fellow CodersCampers learn happily :)***

## About the project
This application is a fully standalone solution for handling the needs of Coders Camp organisers, participants and mentors.
The goal of this project was to build the backend service with all the necessary mechanisms to store the Coders Camp-related information and provide the corresponding frontend application allowing the users to manage their course progress, grades, learning materials etc.

## Team behind the project
- Krystian Kijak (Mentor)
- Ireneusz (Development Manager)
- Robert (Product Owner)
- Justyna (Code Review)
- Konrad (Code Review)
- Filip (Code Review)

## Project structure
The project repository is split into two parts:
- **Api** folder containing all the backend functionalities
- **Frontend** folder containing the client-side part of the application

## Application functionalities
- For Coders Camp organisers
    - managing the course participants
    - grouping the users with mentors
    - having the overview of users progress
    - sharing the learning materials with the participants
- For Coders Camp mentors
    - having overview of group progress
    - private sharing the grades with group members
    - grading the projects (for own group and the group where mentor is a reviewer)
- For Coders Camp participants      
    - checking the course timeline
    - overview of the grades
    - access to the learning materials
    - submitting a project

## Backend service description
### How to run the backend
1. You can clone the repository, install the dependencies with ```npm install``` and run the app with ```npm run start:dev```
2. Alternatively just use the production version of the application available at ```https://coders-camp-organization-app.herokuapp.com/```

For both options be aware that you have to 
1. Create your own account using ```/api/register``` endpoint
2. Log in using ```/api/login``` endpoint
3. Then you will be able to access the user endpoints - the endpoints available for Admins/Mentors can be tested after requesting the appropriate access from the app development team

### Endpoint documentation
All endpoints with sample requests are described in ```swagger.yml``` file - you can check the documentation by copying the content to e.g. ```https://editor.swagger.io/```
### Backend functionalities
##### User management
Each user has an appropriate role assigned (Admin, Mentor, User) and can only use the endpoints that are approved for his level of permissions
##### Password management
Password is being hashed during the registration and is safely stored in the database in hashed form.
##### Password reset
When password reset is requested then email with password reset link is sent with authentication token added as URL parameter. Token is valid for 1 hour. Only email owner can open the link and change his password, with additional token validation to ensure full process safety.

### Used technologies
- **Node.JS** - Javascript runtime for building server-side JS applications
- **Typescript** - superset of JS for additional static typing
- **Jest** - testing package
- **Express** - Node.JS framework
- **MongoDB** - Document database for data storage - in our project cloud MongoDB Atlas service was used
- **Mongoose** - Data Modelling Library for MongoDB
- **Joi** - Data validation library
- **Nodemailer** - Mailing library
- **Handlebars** - Mailing template library
- **JsonWebToken** - Tokenization method for users authentication
- **BCrypt** - Password hashing library for password management
- **Heroku** - Platform-as-a-Service used for application deployment
- **Dependency Injection** - design pattern for decoupling dependent application elements (to ease the maintenance)

### Api folder content
- **Src** folder - source code for the backend application
    - **Controllers** - functionalities for directly responding to user actions
    - **Middlewares** - functions for request data manipulations before executing root functionalities
    - **Models** - data models
    - **Repositories*** - functions for database interactions
    - **Routes** - endpoint routes definitions
    - **Services** - functions for executing database interactions
- **Test** - Unit tests
- **UnitImplementations** - folder for Unit functionalities presentations (used just for mailing service)
- **Utils** - mailing templates
- App.ts - application initialization
- Container.ts - Dependency Injection container definition
- CreateContainer.ts - Dependency Injection execution
- index.ts - main application instantiation
