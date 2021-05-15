import React from 'react'
import styles from './PrivateRoute.module.css'
import { Route, RouteProps } from 'react-router-dom'
import Menu from '../Menu'

export interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.content}>
        <Route {...props} />
      </div>
    </div>
  )
}

export default PrivateRoute
