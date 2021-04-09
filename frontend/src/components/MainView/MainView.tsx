import React, { useState } from "react";
import styles from "./MainView.module.css";
import Header from "../Header";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import HomePage from "../HomePage";
import LogIn from "../LogIn";
import RegistrationView from "../Registration";
import ResetPassword from "../ResetPassword";
import { getUserFromLocalStorage } from "../../app/utils";
import { UserType } from '../../models/User.model'

interface LoggedInViewProps {
  onLogout?: Function
}

const MainView: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  const userData = getUserFromLocalStorage();

  const MainContent = () => {
    if( !(userData.userType) ) return <LogIn onLogin={() => setIsLogged(true)}/>;
    //@ts-ignore
    switch (parseInt(userData.userType)) {
      case UserType.Admin:
        return <Admin onLogout={() => setIsLogged(false)}/>
      case UserType.Mentor:
        return <Mentor />
      default:
        return <User/>
    }
  }

  return (
    <div className={styles.mainContainer}>
      <MainContent/>
    </div>
  );
};



function Admin(props: LoggedInViewProps) {
  return (
    <div className={styles.mainContainer} >
      <Header onLogout={props.onLogout}/>
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
      <Header onLogout={props.onLogout}/>
      <Switch>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/team">
          <Teams />
        </PrivateRoute>
        <PrivateRoute path="/gradesheets">
          <Gradesheets />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <MyProfile />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  )
}

function User(props: LoggedInViewProps) {
  return (
    <div className={styles.mainContainer}>
      <Header onLogout={props.onLogout}/>
      <Switch>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/grades">
          <UserGrades />
        </PrivateRoute>
        <PrivateRoute path="/team">
          <Projects />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <MyProfile />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  )
}

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
function UserGrades() {
  return <h2>My grades</h2>;
}

export default MainView;
