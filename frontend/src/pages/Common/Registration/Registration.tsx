import React, { useState } from 'react'

import {
  Button,
  CssBaseline,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core'
import StyledTextField from '../../../components/StyledTextField'
import useStyles from './Registration.style'
import HeaderRegistration from '../../../components/HeaderRegistration'
import InvalidMessageHandler from '../../../components/InvalidMessageHandler'
import useSnackbar from '../../../hooks/useSnackbar'
import { useHistory } from 'react-router-dom'
import { api } from '../../../api'

export interface formProps {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword: string
}

export function Registration() {
  const classes = useStyles()
  const history = useHistory()
  const { showError, showSuccess } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<formProps>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const areAllFieldsFilled =
    form.name &&
    form.surname &&
    form.email &&
    form.password &&
    form.confirmPassword

  const validateNameAndSurname = (
    element: HTMLElement,
    key: keyof formProps,
  ): boolean => {
    if (form[key].length < 3 || form[key].length > 30) {
      element.classList?.add('invalid')
      return false
    } else {
      element.classList?.remove('invalid')
      return true
    }
  }

  const validateEmail = (
    element: HTMLElement,
    key: keyof formProps,
  ): boolean => {
    if (form[key].indexOf('@') === -1) {
      element.classList?.add('invalid')
      return false
    } else {
      element.classList?.remove('invalid')
      return true
    }
  }

  const validatePasswd = (
    element: HTMLElement,
    key: keyof formProps,
  ): boolean => {
    // min: 8, max: 26, lowerCase: 1, upperCase: 1, numeric: 1
    if (
      form[key].length < 8 ||
      form[key].length > 26 ||
      !/\d/.test(form[key]) ||
      !/[A-Z]/.test(form[key])
    ) {
      element.classList?.add('invalid')
      return false
    } else {
      element.classList?.remove('invalid')
      return true
    }
  }

  const validateConfirmPasswd = (
    element: HTMLElement,
    key: keyof formProps,
  ): boolean => {
    if (form[key] !== form['password']) {
      element.classList?.add('invalid')
      return false
    } else {
      element.classList?.remove('invalid')
      return true
    }
  }

  const validateForm = (): boolean => {
    for (const key of Object.keys(form)) {
      const element = document.querySelector(`[data-${key}]`) as HTMLElement
      if (key === 'name' || key === 'surname') {
        if (!validateNameAndSurname(element, key)) return false
      }
      if (key === 'email') {
        if (!validateEmail(element, key)) return false
      }
      if (key === 'password') {
        if (!validatePasswd(element, key)) return false
      }
      if (key === 'confirmPassword') {
        if (!validateConfirmPasswd(element, key)) return false
      }
    }
    return true
  }

  const handleFormChange = (e: any) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!validateForm()) return
    setLoading(true)
    try {
      await api.post('register', form)
      showSuccess('Registration completed. You can log in now.')
      setLoading(false)
      history.push('/login')
    } catch (error) {
      showError(error?.response?.data?.message ?? 'Unable to register')
      setLoading(false)
    }
  }

  return (
    <div>
      <HeaderRegistration />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  value={form.name}
                  onChange={handleFormChange}
                  autoFocus
                  autoComplete="fname"
                  name="name"
                  label="Name"
                  data-testid="r-fname"
                  data-name
                />
                <InvalidMessageHandler message="Name is too short or too long!" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  value={form.surname}
                  onChange={handleFormChange}
                  label="Surname"
                  name="surname"
                  autoComplete="lname"
                  data-testid="r-lname"
                  data-surname
                />
                <InvalidMessageHandler message="Surname is too short or too long!" />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  value={form.email}
                  onChange={handleFormChange}
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  data-testid="r-email"
                  data-email
                />
                <InvalidMessageHandler message="Incorrect email address!" />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  value={form.password}
                  onChange={handleFormChange}
                  name="password"
                  label="Password"
                  type="password"
                  data-testid="r-password"
                  data-password
                />
                <InvalidMessageHandler message="Pasword should be more complex!" />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  value={form.confirmPassword}
                  onChange={handleFormChange}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  data-testid="r-cpassword"
                  data-confirmPassword
                />
                <InvalidMessageHandler message="Confirm Password doesn't match password!" />
              </Grid>
            </Grid>
            {loading ? (
              <CircularProgress color="primary" className={classes.submit} />
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!areAllFieldsFilled}
                  classes={{
                    disabled: classes.buttonDisabled,
                  }}
                  data-testid="r-button"
                  type="submit"
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
              </>
            )}
          </form>
        </div>
      </Container>
    </div>
  )
}
