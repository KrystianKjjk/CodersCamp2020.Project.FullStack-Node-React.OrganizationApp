import React, { useState } from "react";
import styles from "./MainView.module.css";
import Header from "../Header";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import HomePage from "../HomePage";
import CourseCreate from "../CourseCreate";
import Course from '../Course';
import CourseList from '../CourseList';
import LogIn from "../LogIn";
import RegistrationView from "../Registration";
import ResetPassword from "../ResetPassword";
import ManageTeam from "../ManageTeam";
import { getUserFromLocalStorage } from "../../app/utils";
import ManageTeams from '../ManageTeams';
import ManageUsers from '../ManageUsers';
import { UserType } from '../../models/User.model'

interface LoggedInViewProps {
  onLogout?: Function
}

interface LoggedOutViewProps {
  onLogin?: Function
}

const MainView: React.FC = () => {
  const userData = getUserFromLocalStorage();
  const [isLogged, setIsLogged] = useState(Boolean(userData.userType));

  const MainContent = () => {
    if (!(isLogged)) return <LoggedOut onLogin={() => setIsLogged(true)} />;
    //@ts-ignore
    switch (parseInt(userData.userType)) {
      case UserType.Admin:
        return <Admin onLogout={() => setIsLogged(false)} />
      case UserType.Mentor:
        return <Mentor onLogout={() => setIsLogged(false)} />
      default:
        return <User onLogout={() => setIsLogged(false)} />
    }
  }

  return (
    <div className={styles.mainContainer}>
      <MainContent />
    </div>
  );
};

function LoggedOut(props: LoggedOutViewProps) {
  return (
    <div className={styles.mainContainer} >
      <Switch>
        <Route path="/login">
          <LogIn onLogin={props.onLogin} />
        </Route>
        <Route path="/registration">
          <RegistrationView />
        </Route>
        <Route path="/resetpassword">
          <ResetPassword />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  )
}

function Admin(props: LoggedInViewProps) {
  return (
    <div className={styles.mainContainer} >
      <Header onLogout={props.onLogout} />
      <Switch>
        <PrivateRoute path="/users">
          <ManageUsers />
        </PrivateRoute>
        <PrivateRoute exact path="/courses">
          <CourseList/>
        </PrivateRoute>
        <PrivateRoute exact path="/coursecreate">
          <CourseCreate/>
        </PrivateRoute>
        <PrivateRoute path="/courses/:id" component={Course}>
        </PrivateRoute>
        <PrivateRoute path="/sections">
          <Sections />
        </PrivateRoute>
        <PrivateRoute path="/gradesheets">
          <Gradesheets />
        </PrivateRoute>
        <PrivateRoute path="/projects">
          <Projects />
        </PrivateRoute>
        <PrivateRoute path="/teamprojects">
          <TeamProjects />
        </PrivateRoute>
        <PrivateRoute path="/teams/:teamId">
          <ManageTeam />
        </PrivateRoute>
        <PrivateRoute path="/teams">
          <ManageTeams />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <MyProfile />
        </PrivateRoute>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}


function Mentor(props: LoggedInViewProps) {
  return (
    <div className={styles.mainContainer}>
      <Header onLogout={props.onLogout} />
      <Switch>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/team">
          <MyTeam />
        </PrivateRoute>
        <PrivateRoute path="/gradesheets">
          <Gradesheets />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <MyProfile />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}

function User(props: LoggedInViewProps) {
  return (
    <div className={styles.mainContainer}>
      <Header onLogout={props.onLogout} />
      <Switch>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/grades">
          <UserGrades />
        </PrivateRoute>
        <PrivateRoute path="/team">
          <MyTeam />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <MyProfile />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}


function Courses() {
  return <h2>Courses</h2>;
}
function Users() {
  return <h2>Users</h2>
}
function Sections() {
  return <h2>Sections</h2>;
}
function Gradesheets() {
  return <h2>Grade sheets</h2>;
}
function Projects() {
  return <h2>Projects</h2>;
}
function TeamProjects() {
  return <h2>Team projects</h2>;
}
function MyTeam() {
  return <h2>My team</h2>;
}
function MyProfile() {
  return <h2>My profile</h2>;
}
function UserGrades() {
  return <h2>My grades</h2>;
}

export default MainView;
