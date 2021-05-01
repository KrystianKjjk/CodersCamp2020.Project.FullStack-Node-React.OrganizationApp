import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppsIcon from "@material-ui/icons/Apps";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItemLink from '../ListItemLink';
import { UserType } from '../../models/User.model'
import { getUserFromLocalStorage } from "../../app/utils";
import {useSelector} from "react-redux";
import {selectUserData} from "../../pages/Common/HomePage/HomePageSlice";

export interface MenuProps { }

const Menu: React.FC<MenuProps> = (props) => {
    const {userData} = useSelector(selectUserData);

    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "23%",
        maxWidth: 360,
        minWidth: 180,
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
      userDiv: {
        borderBottom: "1px solid #666666"
      },
    })
  );

  const classes = useStyles();

  const userInfo = getUserFromLocalStorage();

  const VisibleOptions = () => {
    //@ts-ignore
    switch (parseInt(userInfo.userType)) {
      case UserType.Admin:
        return (
          <List component="nav">
            <div className={classes.userDiv}>
              <AccountCircleIcon
                style={{ paddingTop: 20, fontSize: 40 }}
              ></AccountCircleIcon>
              <p style={{ fontWeight: 500 }}>{`${userData?.name} ${userData?.surname}`}</p>
              <p>Admin</p>
            </div>
            <ListItemLink
              path="/users"
              icon={<PeopleIcon />}
              text="Users"
            />
            <ListItemLink
              path="/courses"
              icon={<NotificationsIcon />}
              text="Courses"
            />
            <ListItemLink
              path="/sections"
              icon={<AppsIcon />}
              text="Sections"
            />
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
            <ListItemLink
              path="/teams"
              icon={<PeopleIcon />}
              text="Teams"
            />
            <span className={classes.span}>Settings</span>
            <ListItemLink
              path="/myprofile"
              icon={<SettingsIcon />}
              text="My profile"
            />
          </List>
        )

      case UserType.Mentor:
        return (
          <List component="nav">
            <div className={classes.userDiv}>
              <AccountCircleIcon
                style={{ paddingTop: 20, fontSize: 40 }}
              ></AccountCircleIcon>
              <p style={{ fontWeight: 500 }}>{`${userData?.name} ${userData?.surname}`}</p>
              <p>Mentor</p>
            </div>
            <ListItemLink
              path="/gradesheets"
              icon={<AssignmentIcon />}
              text="Grade sheets"
            />
            <ListItemLink 
              path="/team" 
              icon={<PeopleIcon />} 
              text="Team" 
            />
            <span className={classes.span}>Settings</span>
            <ListItemLink
              path="/myprofile"
              icon={<SettingsIcon />}
              text="My profile"
            />
          </List>
        )

      default:
        return (
          <List component="nav">
            <div className={classes.userDiv}>
              <AccountCircleIcon
                style={{ paddingTop: 20, fontSize: 40 }}
              ></AccountCircleIcon>
              <p style={{ fontWeight: 500 }}>{`${userData?.name} ${userData?.surname}`}</p>
              <p>Participant</p>
            </div>
            <ListItemLink
              path="/grades"
              icon={<AssignmentIcon />}
              text="Grades"
            />
            <ListItemLink 
              path="/team" 
              icon={<PeopleIcon />} 
              text="Team" 
            />
            <span className={classes.span}>Settings</span>
            <ListItemLink
              path="/myprofile"
              icon={<SettingsIcon />}
              text="My profile"
            />
          </List>
        )
    }
  }

  return (
    <div className={classes.root}>
      <VisibleOptions />
    </div>
  );
};

export default Menu;
