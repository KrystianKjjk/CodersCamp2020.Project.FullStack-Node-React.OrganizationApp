import React, { useState } from 'react'
import { Button, CssBaseline, Typography, Container } from '@material-ui/core'
import StyledTextField from '../../../components/StyledTextField'
import HeaderRegistration from '../../../components/HeaderRegistration'
import useSnackbar from '../../../hooks/useSnackbar'
import SuccessfulResetPasswordInfo from './SuccessfulResetPasswordInfo'
import useStyles from './ResetPasswordStyles'
import { api } from '../../../api'

export interface ResetPasswordRequestProps {}

export default function ResetPasswordRequest() {
  const { showError } = useSnackbar()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [beenSent, setBeenSent] = useState(false)

  const handleSubmit = async () => {
    try {
      await api.post('users/requestpasswordreset', { email })
      setBeenSent(true)
    } catch (error) {
      showError('Incorrect email!')
      console.log(error)
    }
  }

  if (beenSent)
    return (
      <SuccessfulResetPasswordInfo
        title={'Email with reset link has been sent!'}
      />
    )
  return (
    <div>
      <HeaderRegistration />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <div className={classes.form}>
            <StyledTextField
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              data-testid="rp-email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              data-testid="rp-button"
              onClick={handleSubmit}
            >
              Send
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
