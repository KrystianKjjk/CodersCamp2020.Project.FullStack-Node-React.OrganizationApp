import React, { useState } from 'react'
import PeopleIcon from '@material-ui/icons/People'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AppsIcon from '@material-ui/icons/Apps'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import SettingsIcon from '@material-ui/icons/Settings'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ListItemLink from '../../ListItemLink'

import styles from './MenuAdmin.module.css'

export interface MenuProps {
  name: string
  surname: string
  smallMenu: boolean
}

enum MenuAdminOption {
  Users = 'Users',
  Courses = 'Courses',
  Sections = 'Sections',
  'Grade sheets' = 'Grade sheets',
  Projects = 'Projects',
  'Team projects' = 'Team projects',
  Teams = 'Teams',
  'My profile' = 'My profile',
}

const MenuAdmin: React.FC<MenuProps> = ({ name, surname, smallMenu }) => {
  const [selected, setSelected] = useState<MenuAdminOption | null>(null)

  const handleSelect = (option: MenuAdminOption) => {
    setSelected(option)
  }

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
        text={MenuAdminOption.Users}
        onClick={() => {
          handleSelect(MenuAdminOption.Users)
        }}
        selected={selected === MenuAdminOption.Users}
      />
      <ListItemLink
        path="/courses"
        icon={<NotificationsIcon className={styles.icon} />}
        text={MenuAdminOption.Courses}
        onClick={() => {
          handleSelect(MenuAdminOption.Courses)
        }}
        selected={selected === MenuAdminOption.Courses}
      />
      <ListItemLink
        path="/sections"
        icon={<AppsIcon className={styles.icon} />}
        text={MenuAdminOption.Sections}
        onClick={() => {
          handleSelect(MenuAdminOption.Sections)
        }}
        selected={selected === MenuAdminOption.Sections}
      />
      <ListItemLink
        path="/gradesheets"
        icon={<AssignmentIcon className={styles.icon} />}
        text={MenuAdminOption['Grade sheets']}
        onClick={() => {
          handleSelect(MenuAdminOption['Grade sheets'])
        }}
        selected={selected === MenuAdminOption['Grade sheets']}
      />
      <ListItemLink
        path="/projects"
        icon={<EmojiObjectsIcon className={styles.icon} />}
        text={MenuAdminOption.Projects}
        onClick={() => {
          handleSelect(MenuAdminOption.Projects)
        }}
        selected={selected === MenuAdminOption.Projects}
      />
      <ListItemLink
        path="/teamprojects"
        icon={<EmojiObjectsIcon className={styles.icon} />}
        text={MenuAdminOption['Team projects']}
        onClick={() => {
          handleSelect(MenuAdminOption['Team projects'])
        }}
        selected={selected === MenuAdminOption['Team projects']}
      />
      <ListItemLink
        path="/teams"
        icon={<PeopleIcon className={styles.icon} />}
        text={MenuAdminOption.Teams}
        onClick={() => {
          handleSelect(MenuAdminOption.Teams)
        }}
        selected={selected === MenuAdminOption.Teams}
      />
      {!smallMenu && <span className={styles.settings}>Settings</span>}
      <ListItemLink
        path="/myprofile"
        icon={<SettingsIcon className={styles.icon} />}
        text={MenuAdminOption['My profile']}
        onClick={() => {
          handleSelect(MenuAdminOption['My profile'])
        }}
        selected={selected === MenuAdminOption['My profile']}
      />
    </nav>
  )
}

export default MenuAdmin
