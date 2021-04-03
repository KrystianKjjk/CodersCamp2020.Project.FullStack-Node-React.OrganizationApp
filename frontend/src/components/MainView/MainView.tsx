import React from "react";
import styles from "./MainView.module.css";
import Header from "../Header";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import HomePage from "../HomePage";

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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <PrivateRoute path="/"><HomePage/></PrivateRoute>
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
function Teams() {
  return <h2>Teams</h2>;
}
function MyProfile() {
  return <h2>My profile</h2>;
}
function Login() {
  return <h2>Log in</h2>;
}
function Registration() {
  return <h2>Registration</h2>;
}

export default MainView;
