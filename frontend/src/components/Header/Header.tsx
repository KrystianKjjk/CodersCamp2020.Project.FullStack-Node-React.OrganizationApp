import React from 'react'
import styles from './Header.module.css'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import { removeUserFromLocalStorage } from '../../app/utils'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../Menu/MenuSlice'

import MenuIcon from '@material-ui/icons/Menu'

interface HeaderProps {
  onLogout?: Function
}

const Header = (props: HeaderProps) => {
  const { activeCourse } = useAppSelector((state) => state.courseList)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    removeUserFromLocalStorage()
  }

  const history = useHistory()
  const routeChange = () => {
    let path = `/`
    history.push(path)
  }

  const takeHome = () => {
    let path = `/home`
    history.push(path)
  }

  const handleMenuIconClick = () => {
    dispatch(toggleMenu())
  }

  return (
    <div className={styles.header}>
      <div
        style={{ display: 'flex', alignItems: 'center', marginLeft: '1.8rem' }}
      >
        <MenuIcon onClick={handleMenuIconClick} style={{cursor: "pointer"}}/>
        <div
          className={styles.logo}
          onClick={takeHome}
          style={{ cursor: 'pointer' }}
        >
          <span>.</span>Coders<span>Camp</span>
        </div>
      </div>
      <div className={styles.activeCourseBox}>
        <p className={styles.activeCourse}>{activeCourse?.name}</p>
        <div
          className={styles.logout}
          onClick={() => {
            handleLogOut()
            routeChange()
            if (props.onLogout) props.onLogout()
          }}
        >
          <PowerSettingsNewIcon style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          <span> Log out</span>
        </div>
      </div>
    </div>
  )
}

export default Header
