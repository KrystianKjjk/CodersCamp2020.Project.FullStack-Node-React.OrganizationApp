import React from "react";
import styles from "./Menu.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  return (
    <Router>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link to="/users">
              <i></i><span>Users</span>
            </Link>
          </li>
          
          <Link to="/courses">
            <li>Courses</li>
          </Link>
          <Link to="/sections">
            <li>Sections</li>
          </Link>
          <Link to="/gradesheets">
            <li>Grade sheets</li>
          </Link>
          <Link to="/projects">
            <li>Projects</li>
          </Link>
          <Link to="/teamprojects">
            <li>Team projects</li>
          </Link>
          <Link to="/teams">
            <li>Teams</li>
          </Link>
          <Link to="/myprofile">
            <li>My profile</li>
          </Link>
          <Link to="/">
            <li>Home page</li>
          </Link>
        </ul>
      </div>
    </Router>
  );
};

export default Menu;
