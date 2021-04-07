import React from "react";
import styles from "./MainView.module.css";
import Header from "../Header";
import { Switch, Route, Redirect} from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import HomePage from "../HomePage";
import LogIn from "../LogIn";
import RegistrationView from "../Registration";
import ResetPassword from "../ResetPassword";
import { getUserFromLocalStorage } from "../../app/utils";
import ManageSections from "../ManageSections";
import SectionView from "../SectionView";
import getSections, { getOneSection } from '../../api/getSections';

const MainView: React.FC = () => {

  return (
    <div className={styles.mainContainer}>
      <Header />
      <Switch>
        <PrivateRoute path="/users">
          <Users />
        </PrivateRoute>
        <PrivateRoute path="/courses">
          <Courses/>
        </PrivateRoute>
        <PrivateRoute path="/sections/:id/edit">
          <SectionView />
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
        <PrivateRoute path="/teams">
          <Teams />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <MyProfile />
        </PrivateRoute>
        <Route path="/registration">
          <RegistrationView />
        </Route>
        <Route path="/resetpassword">
          <ResetPassword />
        </Route>
        <PrivateRoute path="/home">
          <HomePage/>
        </PrivateRoute>
        <Route exact path="/">
          {getUserFromLocalStorage().userType ? <Redirect to="/home" /> : <LogIn />}
        </Route>
      </Switch>
    </div>
  );
};

function Users() {
  return <h2>Users</h2>;
}
function Courses() {
  return <h2>Courses</h2>;
}
function Sections() {
  return <ManageSections />
}

function Gradesheets() {
  return <h2>Greadsheets</h2>
}
function Projects() {
  return <h2>Projects</h2>;
}
function TeamProjects() {
  return <h2>Team projects</h2>;
}
function Teams() {
  return <h2>Teams</h2>;
}
function MyProfile() {
  return <h2>My profile</h2>;
}

export default MainView;
