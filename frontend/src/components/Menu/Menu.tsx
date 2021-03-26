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
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppsIcon from "@material-ui/icons/Apps";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "19%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.default,
        borderRight: "1px solid #666",
        color: "#fff",
        "& .MuiListItem-root": {
          "&:hover": {
            color: "#1A90FF",
            backgroundColor: "#1C1C1C",
          },
        },
        "& .MuiListItemIcon-root": {
          color: "inherit",
        },
      },
      span: {
        paddingLeft: "13px",
        float: "left",
        color: "#9E9E9E",
        fontSize: "14px",
      },
      userDiv:{
        borderBottom: "1px solid #666666"
      }
    })
  );

  // function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  //   return <ListItem button component="a" {...props} />;
  // }

  interface ListItemLinkProps {
    path: string;
    icon: React.ReactNode;
    text: string;
  }

  const classes = useStyles();

  const ListItemLink = ({ path, icon, text }: ListItemLinkProps) => {
    return (
      <ListItem button component={Link} to={path}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    );
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <div className={classes.userDiv}>
          <AccountCircleIcon style={{ paddingTop: 20, fontSize: 40 }}></AccountCircleIcon>
          <p style={{fontWeight:500}}>Name Surname</p>
          <p >Admin</p>
        </div>
        <ListItemLink path="/users" icon={<PeopleIcon />} text="Users" />
        <ListItemLink
          path="/courses"
          icon={<NotificationsIcon />}
          text="Courses"
        />
        <ListItemLink path="/sections" icon={<AppsIcon />} text="Sections" />
        <ListItemLink
          path="/gradesheets"
          icon={<AssignmentIcon />}
          text="Grade sheets"
        />
        <ListItemLink
          path="/projects"
          icon={<EmojiObjectsIcon />}
          text="Projects"
        />
        <ListItemLink
          path="/teamprojects"
          icon={<EmojiObjectsIcon />}
          text="Team projects"
        />
        <ListItemLink path="/teams" icon={<PeopleIcon />} text="Teams" />
        <span className={classes.span}>Settings</span>
        <ListItemLink
          path="/myprofile"
          icon={<SettingsIcon />}
          text="My profile"
        />
      </List>
    </div>
  );
  // }
};

export default Menu;

// return (
//     <div className={styles.menu}>
//       <Link to="/users">
//         <PeopleIcon></PeopleIcon>
//         <span>Users</span>
//       </Link>
//       <Link to="/courses">
//         <NotificationsIcon></NotificationsIcon>
//         <span>Courses</span>
//       </Link>
//       <Link to="/sections">
//         <AppsIcon></AppsIcon>
//         <span>Sections</span>
//       </Link>
//       <Link to="/gradesheets">
//         <AssignmentIcon></AssignmentIcon>
//         <span>Grade sheets</span>
//       </Link>
//       <Link to="/projects">
//         <EmojiObjectsIcon></EmojiObjectsIcon>
//         <span>Projects</span>
//       </Link>
//       <Link to="/teamprojects">
//         <EmojiObjectsIcon></EmojiObjectsIcon>
//         <span>Team projects</span>
//       </Link>
//       <Link to="/teams">
//       <PeopleIcon></PeopleIcon>
//         <span>Teams</span>
//       </Link>
//       <Link to="/myprofile">
//         <SettingsIcon></SettingsIcon>
//         <span>My profile</span>
//       </Link>
//       <Link to="/">
//         <span>Home page</span>
//       </Link>
//     </div>
