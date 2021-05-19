import React from 'react'
import styles from './PrivateRoute.module.css'
import { Route, RouteProps } from 'react-router-dom'
import Menu from '../Menu'
import { useSelector } from 'react-redux'
import { selectHeader } from '../Header/HeaderSlice'
import MenuSmall from '../MenuSmall'

export interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { showSmallMenu } = useSelector(selectHeader);

  return (
    <div className={styles.container}>
      { showSmallMenu ? <MenuSmall /> : <Menu /> }
      <div className={styles.content}>
        <Route {...props} />
      </div>
    </div>
  )
}

export default PrivateRoute
