import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AssignmentIcon from '@material-ui/icons/Assignment'
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

enum MenuParticipantOption {
  Grades = 'grades',
  Team = 'team',
  MyProfile = 'myprofile',
}

const MenuParticipant: React.FC<MenuProps> = ({ name, surname, smallMenu }) => {
  const [selected, setSelected] = useState<MenuParticipantOption | null>(null)
  const location = useLocation()

  useEffect(() => {
    const option: MenuParticipantOption = location.pathname.replace(
      '/',
      '',
    ) as MenuParticipantOption
    setSelected(option)
  }, [location])

  return (
    <nav className={smallMenu ? styles.navSmall : styles.nav}>
      {!smallMenu && (
        <div style={{ borderBottom: '1px solid #666' }}>
          <AccountCircleIcon style={{ paddingTop: 20, fontSize: 40 }} />
          <p style={{ fontWeight: 500 }}>{`${name || ''} ${surname || ''}`}</p>
          <p>Participant</p>
        </div>
      )}

      <ListItemLink
        path="/grades"
        icon={<AssignmentIcon className={styles.icon} />}
        text="Grades"
        selected={selected === MenuParticipantOption.Grades}
      />

      <ListItemLink
        path="/team"
        icon={<NotificationsIcon className={styles.icon} />}
        text="Team"
        selected={selected === MenuParticipantOption.Team}
      />
      {!smallMenu && <span className={styles.settings}>Settings</span>}
      <ListItemLink
        path="/myprofile"
        icon={<SettingsIcon className={styles.icon} />}
        text="My profile"
        selected={selected === MenuParticipantOption.MyProfile}
      />
    </nav>
  )
}

export default MenuParticipant
