import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import styles from './MainView.module.css'
import Header from '../../../components/Header'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from '../../../components/PrivateRoute'
import HomePage from '../HomePage'

import CourseCreate from '../../Admin/CourseCreate'
import Course from '../../Admin/Course'
import CourseList from '../../Admin/CourseList'
import LogIn from '../LogIn'
import { Registration } from '../Registration'
import ManageTeam from '../../Admin/ManageTeam'
import { getUserFromLocalStorage } from '../../../app/utils'
import ManageSheets from '../../Admin/ManageSheets'
import ManageSheet from '../../Admin/ManageSheet'
import TeamProjects from '../../Admin/TeamProjects'
import ManageTeams from '../../Admin/ManageTeams'
import ManageUsers from '../../Admin/ManageUsers'
import UserGrades from '../../Participant/UserGrades'
import ManageUser from '../../Admin/ManageUser'
import ResetPasswordFromLink from '../ResetPassword/ResetPasswordFromLink'
import ManageSections from '../../Admin/ManageSections'
import SectionView from '../../Admin/SectionView'
import MyProfileView from '../MyProfile'
import { UserType as Role } from '../../../models/User.model'
import ReferenceProjects from '../../Admin/ReferenceProjects'
import ManageReferenceProject from '../../Admin/ManageReferenceProject'
import TeamProject from '../../Admin/TeamProject'
import ResetPasswordRequest from '../ResetPassword'
import { api } from '../../../api'
import { useDidUpdateEffect, useUserMe } from '../../../hooks'
import { useQueryClient } from 'react-query'

interface LoggedInViewProps {
  onLogout?: Function
}

interface LoggedOutViewProps {
  onLogin?: Function
}

const MainView: React.FC = () => {
  const userData = getUserFromLocalStorage()
  const userID = userData.userId ?? ''

  const [isLogged, setIsLogged] = useState(Boolean(userData.userType))
  const queryClient = useQueryClient()

  useUserMe({
    enabled: !!userID,
  })

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  useDidUpdateEffect(() => {
    if (isLogged) queryClient.refetchQueries(['user', 'me'])
    else queryClient.removeQueries(['user', 'me'])
  }, [isLogged])

  const handleLogout = async () => {
    await api.get('logout')
    removeCookie('token')
    setIsLogged(false)
  }

  const MainContent = () => {
    if (!isLogged) return <LoggedOut onLogin={() => setIsLogged(true)} />
    //@ts-ignore
    switch (parseInt(userData.userType)) {
      case Role.Admin:
        return <Admin onLogout={handleLogout} />
      case Role.Mentor:
        return <Mentor onLogout={handleLogout} />
      default:
        return <Participant onLogout={handleLogout} />
    }
  }

  return (
    <div className={styles.mainContainer}>
      <MainContent />
    </div>
  )
}

function LoggedOut(props: LoggedOutViewProps) {
  return (
    <div className={styles.mainContainer}>
      <Switch>
        <Route path="/login">
          <LogIn onLogin={props.onLogin} />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/resetpassword">
          <ResetPasswordRequest />
        </Route>
        <Route path="/passwordReset">
          <ResetPasswordFromLink />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  )
}

function Admin(props: LoggedInViewProps) {
  return (
    <div className={styles.mainContainer}>
      <Header onLogout={props.onLogout} />
      <Switch>
        <PrivateRoute path="/users/:userID" component={ManageUser} />
        <PrivateRoute path="/users">
          <ManageUsers />
        </PrivateRoute>
        <PrivateRoute path="/courses/:id" component={Course}></PrivateRoute>
        <PrivateRoute exact path="/coursecreate">
          <CourseCreate />
        </PrivateRoute>
        <PrivateRoute path="/courses">
          <CourseList />
        </PrivateRoute>
        <PrivateRoute path="/sections/:id/edit">
          <SectionView />
        </PrivateRoute>
        <PrivateRoute path="/sections/create">
          <SectionView />
        </PrivateRoute>
        <PrivateRoute path="/sections">
          <ManageSections />
        </PrivateRoute>
        <PrivateRoute
          path="/gradesheets/:sheetId"
          component={ManageSheet}
        ></PrivateRoute>
        <PrivateRoute path="/gradesheets">
          <ManageSheets />
        </PrivateRoute>

        <PrivateRoute exact path="/projects">
          <Projects />
        </PrivateRoute>
        <PrivateRoute path="/projects/add" component={ManageReferenceProject} />
        <PrivateRoute
          path="/projects/:projectID"
          component={ManageReferenceProject}
        />
        <PrivateRoute path="/teamprojects/:teamProjectId">
          <TeamProject />
        </PrivateRoute>
        <PrivateRoute path="/teamprojects">
          <TeamProjects />
        </PrivateRoute>

        <PrivateRoute
          path="/teams/:teamId"
          component={ManageTeam}
        ></PrivateRoute>
        <PrivateRoute path="/teams">
          <ManageTeams />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <MyProfile />
        </PrivateRoute>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}

function Mentor(props: LoggedInViewProps) {
  return (
    <div className={styles.mainContainer}>
      <Header onLogout={props.onLogout} />
      <Switch>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/team">
          <MyTeam />
        </PrivateRoute>
        <PrivateRoute path="/gradesheets">
          <ManageSheets />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <MyProfile />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}

function Participant(props: LoggedInViewProps) {
  return (
    <div className={styles.mainContainer}>
      <Header onLogout={props.onLogout} />
      <Switch>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/grades">
          <UserGrades />
        </PrivateRoute>
        <PrivateRoute path="/team">
          <MyTeam />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <MyProfile />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}
function Projects() {
  return <ReferenceProjects />
}

function MyTeam() {
  return <h2>My team</h2>
}
function MyProfile() {
  return <MyProfileView />
}

export default MainView
