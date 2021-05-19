import React from 'react'
import PeopleIcon from '@material-ui/icons/People'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AppsIcon from '@material-ui/icons/Apps'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import SettingsIcon from '@material-ui/icons/Settings'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ListItemLink from '../../ListItemLink'

import styles from './MenuAdmin.module.css';

export interface MenuProps {
  name: string
  surname: string
}

const MenuAdmin: React.FC<MenuProps> = ({ name, surname }) => {

  return (
    <nav className={styles.nav}>
      <div>
        <AccountCircleIcon style={{ paddingTop: 20, fontSize: 40 }} />
        <p style={{ fontWeight: 500 }}>{`${name} ${surname}`}</p>
        <p>Admin</p>
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
      <span>Settings</span>
      <ListItemLink
        path="/myprofile"
        icon={<SettingsIcon />}
        text="My profile"
      />
    </nav>
  )
}

export default MenuAdmin
