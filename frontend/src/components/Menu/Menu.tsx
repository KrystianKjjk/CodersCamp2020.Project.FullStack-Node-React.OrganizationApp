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
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppsIcon from '@material-ui/icons/Apps';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
export interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  return (
      <div className={styles.menu}>
        <Link to="/users">
          <PeopleIcon></PeopleIcon>
          <span>Users</span>
        </Link>
        <Link to="/courses">
          <NotificationsIcon></NotificationsIcon>
          <span>Courses</span>
        </Link>
        <Link to="/sections">
          <AppsIcon></AppsIcon>
          <span>Sections</span>
        </Link>
        <Link to="/gradesheets">
          <AssignmentIcon></AssignmentIcon>
          <span>Grade sheets</span>
        </Link>
        <Link to="/projects">
          <span>Projects</span>
        </Link>
        <Link to="/teamprojects">
          <span>Team projects</span>
        </Link>
        <Link to="/teams">
          <span>Teams</span>
        </Link>
        <Link to="/myprofile">
          <span>My profile</span>
        </Link>
        <Link to="/">
          <span>Home page</span>
        </Link>
      </div>
  );
};

export default Menu;
