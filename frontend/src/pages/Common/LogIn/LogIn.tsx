import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import {
  setActiveCourse,
} from '../../Admin/CourseList/CourseListSlice'

import {
  Button,
  CssBaseline,
  Link,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'

import StyledTextField from '../../../components/StyledTextField'
import useStyles from './LogIn.style'
import BaseService from '../../../app/baseService'
import HeaderRegistration from '../../../components/HeaderRegistration'
import axios from 'axios'
import { useAppDispatch, fetchCoursesAndSort } from '../../../hooks'
import useSnackbar from '../../../hooks/useSnackbar'

export interface LogInProps {
  onLogin?: Function
}

export default function SignIn(props: LogInProps) {
  const classes = useStyles()
  const appDispatch = useAppDispatch()
  const { showError } = useSnackbar()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const routeChange = () => {
    let path = `/home`
    history.push(path)
  }

  const setResponseDataToLocalStorage = (response: AxiosResponse) => {
    const token = response.headers?.['x-auth-token']
    const userId = response.data?.['_id']
    const userType = response.data?.['type']

    localStorage.setItem('token', token)
    localStorage.setItem('id', userId)
    localStorage.setItem('type', userType)
  }

  const handleSignInClick = async () => {
    const service = new BaseService()
    try {
      const response = await service.post('login', { email, password })
      setResponseDataToLocalStorage(response)
      axios.defaults.headers.common = {
        'x-auth-token': localStorage.getItem('token'),
      }
      const courses = await fetchCoursesAndSort()
      const mostRecentCourse = courses[0]
      appDispatch(setActiveCourse(mostRecentCourse))
      routeChange()
      if (props.onLogin) props.onLogin()
    } catch (error) {
      showError(
        error?.response?.data?.message ?? 'Error while trying to sign in',
      )
    }
  }

  return (
    <div>
      <HeaderRegistration />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <StyledTextField
              margin="normal"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              data-testid="li-email"
            />
            <StyledTextField
              margin="normal"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="li-password"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignInClick}
              data-testid="li-button"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/resetpassword" variant="body2" color="inherit">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2" color="inherit">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  )
}
