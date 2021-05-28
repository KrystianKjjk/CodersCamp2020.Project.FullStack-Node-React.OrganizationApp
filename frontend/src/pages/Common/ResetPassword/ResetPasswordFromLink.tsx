import React, { useState } from 'react'
import {
  Button,
  CssBaseline,
  Typography,
  Container,
  Grid,
} from '@material-ui/core'
import StyledTextField from '../../../components/StyledTextField'
import HeaderRegistration from '../../../components/HeaderRegistration'
import useSnackbar from '../../../hooks/useSnackbar'
import useStyles from './ResetPasswordStyles'
import SuccessfulResetPasswordInfo from './SuccessfulResetPasswordInfo'
import { api } from '../../../api'

export interface ResetPasswordProps {}

export default function ResetPasswordFromLink() {
  const classes = useStyles()
  const { showError } = useSnackbar()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [beenSent, setBeenSent] = useState(false)

  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('id')
  const token = urlParams.get('token')
  console.log(userId, token)

  const handleSubmit = async () => {
    try {
      await api.post('users/resetpassword', { userId, token, password })
      setBeenSent(true)
    } catch (error) {
      showError('Incorrect password or the reset link expired!')
    }
  }

  if (beenSent)
    return (
      <SuccessfulResetPasswordInfo title={'Your password has been changed!'} />
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledTextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="New Password"
                  type="password"
                  data-testid="r-password"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="passwordconfirm"
                  label="Confirm New Password"
                  type="password"
                  data-testid="r-cpassword"
                />
              </Grid>
            </Grid>
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
