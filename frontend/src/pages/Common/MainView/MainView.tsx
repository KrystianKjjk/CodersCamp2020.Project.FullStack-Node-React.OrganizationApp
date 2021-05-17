import React, { useEffect, useState } from 'react'
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
import RegistrationView from '../Registration'
import ManageTeam from '../../Admin/ManageTeam'
import { getUserFromLocalStorage } from '../../../app/utils'
import ManageSheets from '../../Admin/ManageSheets'
import ManageSheet from '../../Admin/ManageSheet'
import TeamProjectsComponent from '../../Admin/TeamProjects'
import { getTeamProjects } from '../../../api/TeamProjects.service'
import ManageTeams from '../../Admin/ManageTeams'
import ManageUsers from '../../Admin/ManageUsers'
import UserGrades from '../../Participant/UserGrades'
import { fetchUser, selectUserData } from '../HomePage/HomePageSlice'
import { useDispatch, useSelector } from 'react-redux'
import ManageUser from '../../Admin/ManageUser'
import ResetPasswordFromLink from '../ResetPassword/ResetPasswordFromLink'
import ManageSections from '../../Admin/ManageSections'
import SectionView from '../../Admin/SectionView'
import MyProfileView from '../MyProfile'
import { UserType as Role } from '../../../models/User.model'
import ReferenceProjects from '../../Admin/ReferenceProjects'
import ManageReferenceProject from '../../Admin/ManageReferenceProject'
import BaseService from '../../../app/baseService'
import ResetPasswordRequest from '../ResetPassword'

interface LoggedInViewProps {
  onLogout?: Function
}

interface LoggedOutViewProps {
  onLogin?: Function
}

const MainView: React.FC = () => {
  const userData = getUserFromLocalStorage()
  const service = new BaseService()

  const [isLogged, setIsLogged] = useState(Boolean(userData.userType))

  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const dispatch = useDispatch()
  const { loaded } = useSelector(selectUserData)

  useEffect(() => {
    if (isLogged) {
      const userID = localStorage.getItem('id')
      dispatch(fetchUser(userID))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, loaded])

  const handleLogout = async () => {
    setIsLogged(false)
    await service.get('logout')
    removeCookie('token')
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
          <RegistrationView />
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
function TeamProjects() {
  return <TeamProjectsComponent getFunction={getTeamProjects} />
}

function MyTeam() {
  return <h2>My team</h2>
}
function MyProfile() {
  return <MyProfileView />
}

export default MainView
