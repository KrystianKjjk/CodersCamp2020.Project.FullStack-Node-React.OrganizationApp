import React, { useEffect } from 'react'
import { UserType } from '../../models/User.model'
import { getUserFromLocalStorage } from '../../app/utils'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from '../../pages/Common/HomePage/HomePageSlice'
import { selectMenu } from './MenuSlice'
import MenuAdmin from './MenuAdmin'
import { setMenu, clearMenu } from './MenuSlice'
import debounce from 'lodash.debounce'
import MenuParticipant from './MenuParticipant'

export const WIDTH_SMALL_MENU_ON_PX = 900
export const DEBOUNCE_RESIZE_MS = 100

export interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  const dispatch = useDispatch()

  const {
    userData: { name, surname },
  } = useSelector(selectUserData)
  const { showSmallMenu, showSmallMenuUserAction } = useSelector(selectMenu)

  const { userType } = getUserFromLocalStorage()

  useEffect(() => {
    showSmallMenuUserAction ? dispatch(setMenu()) : dispatch(clearMenu())
  }, [showSmallMenuUserAction])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  const handleResize = debounce(() => {
    if (window.innerWidth <= WIDTH_SMALL_MENU_ON_PX) {
      dispatch(setMenu())
    } else {
      if (!showSmallMenuUserAction) dispatch(clearMenu())
    }
  }, DEBOUNCE_RESIZE_MS)

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
      return <MenuAdmin name={name} surname={surname} smallMenu={showSmallMenu} />
    default:
      return <MenuParticipant name={name} surname={surname} smallMenu={showSmallMenu} />
  }
}

export default Menu
