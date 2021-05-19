import React from 'react'
import { UserType } from '../../models/User.model'
import { getUserFromLocalStorage } from '../../app/utils'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../pages/Common/HomePage/HomePageSlice'
import { selectHeader } from '../Header/HeaderSlice'
import MenuAdmin from './MenuAdmin'
export interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  const { userData: { name, surname } } = useSelector(selectUserData)
  const { showSmallMenu } = useSelector(selectHeader);

  const { userId, userType } = getUserFromLocalStorage();

  /*  const VisibleOptions = () => {
      //@ts-ignore
      switch (parseInt(userInfo.userType)) {
        case UserType.Admin:
          return (
            <List component="nav">
              <div className={classes.userDiv}>
                <AccountCircleIcon
                  style={{ paddingTop: 20, fontSize: 40 }}
                ></AccountCircleIcon>
                <p
                  style={{ fontWeight: 500 }}
                >{`${userData?.name} ${userData?.surname}`}</p>
                <p>Admin</p>
              </div>
              <ListItemLink path="/users" icon={<PeopleIcon />} text="Users" />
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
              <ListItemLink path="/teams" icon={<PeopleIcon />} text="Teams" />
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
                <p
                  style={{ fontWeight: 500 }}
                >{`${userData?.name} ${userData?.surname}`}</p>
                <p>Mentor</p>
              </div>
              <ListItemLink
                path="/gradesheets"
                icon={<AssignmentIcon />}
                text="Grade sheets"
              />
              <ListItemLink path="/team" icon={<PeopleIcon />} text="Team" />
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
                <p
                  style={{ fontWeight: 500 }}
                >{`${userData?.name} ${userData?.surname}`}</p>
                <p>Participant</p>
              </div>
              <ListItemLink
                path="/grades"
                icon={<AssignmentIcon />}
                text="Grades"
              />
              <ListItemLink path="/team" icon={<PeopleIcon />} text="Team" />
              <span className={classes.span}>Settings</span>
              <ListItemLink
                path="/myprofile"
                icon={<SettingsIcon />}
                text="My profile"
              />
            </List>
          )
      }
    }*/

  //@ts-ignore
  switch (parseInt(userType)) {
    case UserType.Admin:
      return <MenuAdmin name={name} surname={surname} smallMenu={showSmallMenu}/>;
    default:
      return <h1>Default</h1>;
  }
}

export default Menu
