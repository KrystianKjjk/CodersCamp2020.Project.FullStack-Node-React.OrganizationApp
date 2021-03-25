import React from "react";
import styles from "./MainView.module.css";
import Header from "../../components/Header";
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from '../PrivateRoute';
export interface MainViewProps {}

const MainView: React.FC<MainViewProps> = (props) => {
  return (
    <div className={styles.mainContainer}>
      <Header/>
        <Switch>
        <PrivateRoute path="/users">
            <Users />
          </PrivateRoute>
          <Route path="/courses">
            <Courses/>
          </Route>
          <PrivateRoute path="/sections">
            <Sections/>
          </PrivateRoute>
          <Route path="/gradesheets">
            <Gradesheets/>
          </Route>
          <Route path="/projects">
            <Projects/>
          </Route>
          <Route path="/teamprojects">
            <TeamProjects/>
          </Route>
          <Route path="/teams">
            <Teams/>
          </Route>
          <Route path="/myprofile">
            <MyProfile/>
          </Route>
          <Route path="/">...</Route>
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
function Sections(){
  return <h2>Sections</h2>;
}
function Gradesheets(){
  return <h2>Gradesheets</h2>;
}
function Projects(){
  return <h2>Projects</h2>;
}
function TeamProjects(){
  return <h2>Team projects</h2>;
}
function Teams(){
  return <h2>Teams</h2>;
}
function MyProfile(){
  return <h2>My profile</h2>;
}

export default MainView;
