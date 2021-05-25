import React, { useEffect, useState } from 'react'
import PeopleIcon from '@material-ui/icons/People'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AppsIcon from '@material-ui/icons/Apps'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import SettingsIcon from '@material-ui/icons/Settings'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ListItemLink from '../../ListItemLink'
import { useLocation } from 'react-router-dom'

import styles from '../Menu.module.css'

export interface MenuProps {
  name: string
  surname: string
  smallMenu: boolean
}

enum MenuAdminOption {
  Users = 'users',
  Courses = 'courses',
  Sections = 'sections',
  GradeSheets = 'gradesheets',
  Projects = 'projects',
  TeamProjects = 'teamprojects',
  Teams = 'teams',
  MyProfile = 'myprofile',
}

const MenuAdmin: React.FC<MenuProps> = ({ name, surname, smallMenu }) => {
  const [selected, setSelected] = useState<MenuAdminOption | null>(null)
  const location = useLocation()

  useEffect(() => {
    const option: MenuAdminOption = location.pathname.replace(
      '/',
      '',
    ) as MenuAdminOption
    setSelected(option)
  }, [location])

  return (
    <nav className={smallMenu ? styles.navSmall : styles.nav}>
      {!smallMenu && (
        <div style={{ borderBottom: '1px solid #666' }}>
          <AccountCircleIcon style={{ paddingTop: 20, fontSize: 40 }} />
          <p style={{ fontWeight: 500 }}>{`${name || ''} ${surname || ''}`}</p>
          <p>Admin</p>
        </div>
      )}

      <ListItemLink
        path="/users"
        icon={<PeopleIcon className={styles.icon} />}
        text="Users"
        selected={selected === MenuAdminOption.Users}
      />
      <ListItemLink
        path="/courses"
        icon={<NotificationsIcon className={styles.icon} />}
        text="Courses"
        selected={selected === MenuAdminOption.Courses}
      />
      <ListItemLink
        path="/sections"
        icon={<AppsIcon className={styles.icon} />}
        text="Sections"
        selected={selected === MenuAdminOption.Sections}
      />
      <ListItemLink
        path="/gradesheets"
        icon={<AssignmentIcon className={styles.icon} />}
        text="Grade sheets"
        selected={selected === MenuAdminOption.GradeSheets}
      />
      <ListItemLink
        path="/projects"
        icon={<EmojiObjectsIcon className={styles.icon} />}
        text="Projects"
        selected={selected === MenuAdminOption.Projects}
      />
      <ListItemLink
        path="/teamprojects"
        icon={<EmojiObjectsIcon className={styles.icon} />}
        text="Team projects"
        selected={selected === MenuAdminOption.TeamProjects}
      />
      <ListItemLink
        path="/teams"
        icon={<PeopleIcon className={styles.icon} />}
        text="Teams"
        selected={selected === MenuAdminOption.Teams}
      />
      {!smallMenu && <span className={styles.settings}>Settings</span>}
      <ListItemLink
        path="/myprofile"
        icon={<SettingsIcon className={styles.icon} />}
        text="My profile"
        selected={selected === MenuAdminOption.MyProfile}
      />
    </nav>
  )
}

export default MenuAdmin
