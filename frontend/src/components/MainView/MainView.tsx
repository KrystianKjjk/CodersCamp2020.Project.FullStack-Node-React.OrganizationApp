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

import ReferenceProjects from "../ReferenceProjects";
import ManageReferenceProject from "../ManageReferenceProject";

const MainView: React.FC = () => {
  
  return (
    <div className={styles.mainContainer}>
      <Header />
      <Switch>
        <PrivateRoute path="/users">
          <Users />
        </PrivateRoute>
        <PrivateRoute path="/courses">
          <Courses />
        </PrivateRoute>
        <PrivateRoute path="/sections">
          <Sections />
        </PrivateRoute>
        <PrivateRoute path="/gradesheets">
          <Gradesheets />
        </PrivateRoute>

        <PrivateRoute exact path="/projects">
          <Projects />
        </PrivateRoute>
        <PrivateRoute path="/projects/add"
                      exact
                      render={({ match }) => <ManageReferenceProject match={match} isAdding={true}/> } />
        <PrivateRoute path="/projects/:projectID"
                      render={({ match }) => <ManageReferenceProject match={match} isAdding={false}/> } />

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
  return <h2>Users</h2>
}
function Courses() {
  return <h2>Courses</h2>;
}
function Sections() {
  return <h2>Sections</h2>;
}
function Gradesheets() {
  return <h2>Grade sheets</h2>;
}
function Projects() {
  return <ReferenceProjects />
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
