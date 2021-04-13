import React, { useState } from "react";
import styles from "./MainView.module.css";
import Header from "../Header";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
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
import ManageSheets from '../ManageSheets';
import ManageSheet from '../ManageSheet';
import TeamProjectsComponent from '../TeamProjects/index';
import { getTeamProjects } from '../../api/TeamProjects.service';
import ManageTeams from '../ManageTeams';
import ManageUsers from '../ManageUsers';
import ManageUser from '../ManageUser';
import ResetPasswordFromLink from '../ResetPassword/ResetPasswordFromLink';
import ManageSections from "../ManageSections";
import SectionView from "../SectionView";
import {UserType} from "../../models";

import ReferenceProjects from "../ReferenceProjects";
import ManageReferenceProject from "../ManageReferenceProject";

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
        return <Participant onLogout={() => setIsLogged(false)} />
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
        <Route path="/passwordReset">
          <ResetPasswordFromLink />
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
        <PrivateRoute path="/users/:userId" component={User}>
        </PrivateRoute>
        <PrivateRoute path="/users">
          <ManageUsers />
        </PrivateRoute>
        <PrivateRoute path="/courses/:id" component={Course}>
        </PrivateRoute>
        <PrivateRoute exact path="/coursecreate">
          <CourseCreate/>
        </PrivateRoute>
        <PrivateRoute path="/courses">
          <CourseList/>
        </PrivateRoute>
        <PrivateRoute path="/sections/:id/edit">
          <SectionView />
        </PrivateRoute>
        <PrivateRoute path="/sections/create">
          <SectionView />
        </PrivateRoute>
        <PrivateRoute path="/sections">
          <ManageSections />
        </PrivateRoute>
        <PrivateRoute path="/gradesheets/:sheetId" component={ManageSheet}>
        </PrivateRoute>
        <PrivateRoute path="/gradesheets">
          <ManageSheets />
        </PrivateRoute>

        <PrivateRoute exact path="/projects">
          <Projects />
        </PrivateRoute>
        <PrivateRoute path="/projects/add" component={ManageReferenceProject} />
        <PrivateRoute path="/projects/:projectID" component={ManageReferenceProject} />

        <PrivateRoute path="/teamprojects">
          <TeamProjects />
        </PrivateRoute>
        <PrivateRoute path="/teams/:teamId" component={ManageTeam}>
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
          <ManageSheets />
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

function Participant(props: LoggedInViewProps) {
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
function Projects() {
  return <ReferenceProjects />
}
function TeamProjects() {
  return <TeamProjectsComponent getFunction={getTeamProjects}/>;
}
const User: React.FC< { } > = () => {
  let { userId } = useParams<{userId: string}>();
  return <ManageUser userID={userId} />
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
