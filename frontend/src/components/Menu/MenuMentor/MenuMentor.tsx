import React, { useEffect, useState } from 'react'
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

enum MenuMentorOption {
  GradeSheets = 'gradesheets',
  MyProfile = 'myprofile',
}

const MenuMentor: React.FC<MenuProps> = ({ name, surname, smallMenu }) => {
  const [selected, setSelected] = useState<MenuMentorOption | null>(null)
  const location = useLocation()

  useEffect(() => {
    const option: MenuMentorOption = location.pathname.replace(
      '/',
      '',
    ) as MenuMentorOption
    setSelected(option)
  }, [location])

  return (
    <nav className={smallMenu ? styles.navSmall : styles.nav}>
      {!smallMenu && (
        <div style={{ borderBottom: '1px solid #666' }}>
          <AccountCircleIcon style={{ paddingTop: 20, fontSize: 40 }} />
          <p style={{ fontWeight: 500 }}>{`${name || ''} ${surname || ''}`}</p>
          <p>Mentor</p>
        </div>
      )}

      <ListItemLink
        path="gradesheets"
        icon={<AssignmentIcon className={styles.icon} />}
        text="Grade sheets"
        selected={selected === MenuMentorOption.GradeSheets}
      />

      {!smallMenu && <span className={styles.settings}>Settings</span>}
      <ListItemLink
        path="/myprofile"
        icon={<SettingsIcon className={styles.icon} />}
        text="My profile"
        selected={selected === MenuMentorOption.MyProfile}
      />
    </nav>
  )
}

export default MenuMentor
