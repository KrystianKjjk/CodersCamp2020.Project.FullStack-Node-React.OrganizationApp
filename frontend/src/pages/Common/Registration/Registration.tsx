import React, { useEffect, useState } from 'react'

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
  const [invalidName, setInvalidName] = useState(false)
  const [invalidSurname, setInvalidSurname] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPasswd, setInvalidPasswd] = useState(false)
  const [invalidConfirmPasswd, setInvalidConfirmPasswd] = useState(false)
  const [form, setForm] = useState<formProps>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const validateName = (): boolean => {
    const flag = form['name'].length >= 3 && form['name'].length <= 30
    setInvalidName(!flag)
    return flag
  }

  const validateSurname = () => {
    const flag = form['surname'].length >= 3 && form['surname'].length <= 30
    setInvalidSurname(!flag)
    return flag
  }

  const validateEmail = (): boolean => {
    const flag = form['email'].indexOf('@') > -1
    setInvalidEmail(!flag)
    return flag
  }

  const validatePasswd = (): boolean => {
    // min: 8, max: 26, lowerCase: 1, upperCase: 1
    const flag =
      (form['password'].length >= 8 && form['password'].length <= 26) ||
      /\d/.test(form['password']) ||
      /[A-Z]/.test(form['password'])
    setInvalidPasswd(!flag)
    return flag
  }

  const validateConfirmPasswd = (): boolean => {
    const flag = form['confirmPassword'] === form['password']
    setInvalidConfirmPasswd(!flag)
    return flag
  }

  const validateForm = (): boolean => {
    const isValidName = validateName()
    const isValidSurname = validateSurname()
    const isValidEmail = validateEmail()
    const isValidPasswd = validatePasswd()
    const isValidConfirmPasswd = validateConfirmPasswd()

    return (
      isValidName &&
      isValidSurname &&
      isValidEmail &&
      isValidPasswd &&
      isValidConfirmPasswd
    )
  }

  const handleFormChange = (e: any) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
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

  useEffect(() => {
    if (
      invalidName ||
      invalidSurname ||
      invalidEmail ||
      invalidPasswd ||
      invalidConfirmPasswd
    )
      validateForm()
  }, [form]) // eslint-disable-line react-hooks/exhaustive-deps

  const areAllFieldsFilled =
    form.name &&
    form.surname &&
    form.email &&
    form.password &&
    form.confirmPassword

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
                  error={invalidName}
                  helperText={invalidName && 'Name is too short or too long!'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  value={form.surname}
                  onChange={handleFormChange}
                  label="Surname"
                  name="surname"
                  autoComplete="lname"
                  data-testid="r-lname"
                  error={invalidSurname}
                  helperText={
                    invalidSurname && 'Surname is too short or too long!'
                  }
                />
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
                  error={invalidEmail}
                  helperText={invalidEmail && 'Incorrect email address!'}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  value={form.password}
                  onChange={handleFormChange}
                  name="password"
                  label="Password"
                  type="password"
                  data-testid="r-password"
                  error={invalidPasswd}
                  helperText={
                    invalidPasswd && 'Pasword should be more complex!'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  value={form.confirmPassword}
                  onChange={handleFormChange}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  data-testid="r-cpassword"
                  error={invalidConfirmPasswd}
                  helperText={
                    invalidConfirmPasswd &&
                    'Confirm password should match the password!'
                  }
                />
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
