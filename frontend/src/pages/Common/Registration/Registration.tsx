import React, { useState } from 'react'

import {
  Button,
  CssBaseline,
  Link,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import StyledTextField from '../../../components/StyledTextField'
import useStyles from './Registration.style'
import HeaderRegistration from '../../../components/HeaderRegistration'
import useSnackbar from '../../../hooks/useSnackbar'
import { useHistory } from 'react-router-dom'
import { api } from '../../../api'

export interface RegistrationProps {}

export default function SignUp() {
  const classes = useStyles()
  const history = useHistory()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { showError, showSuccess } = useSnackbar()

  const handleSignUpClick = async () => {
    try {
      await api.post('register', {
        name,
        surname,
        email,
        password,
        confirmPassword,
      })
      showSuccess('Registration completed. You can log in now.')
      history.push('/login')
    } catch (error) {
      showError(error?.response?.data?.message ?? 'unknown error while sign up')
    }
  }

  const areAllFieldsFilled =
    name && surname && email && password && confirmPassword

  return (
    <div>
      <HeaderRegistration />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  autoComplete="fname"
                  name="firstName"
                  label="Name"
                  data-testid="r-fname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  label="Surname"
                  name="lastName"
                  autoComplete="lname"
                  data-testid="r-lname"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  data-testid="r-email"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  data-testid="r-password"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="passwordconfirm"
                  label="Confirm Password"
                  type="password"
                  data-testid="r-cpassword"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSignUpClick}
              className={classes.submit}
              disabled={!areAllFieldsFilled}
              classes={{
                disabled: classes.buttonDisabled,
              }}
              data-testid="r-button"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2" color="inherit">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  )
}
