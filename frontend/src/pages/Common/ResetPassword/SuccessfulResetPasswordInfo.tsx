import React from 'react'
import { Button, CssBaseline, Typography, Container } from '@material-ui/core'
import HeaderRegistration from '../../../components/HeaderRegistration'
import { useHistory } from 'react-router-dom'
import useStyles from './ResetPasswordStyles'

interface SuccessfulResetPasswordInfoProps {
  title: string
}
const SuccessfulResetPasswordInfo: React.FC<SuccessfulResetPasswordInfoProps> = ({
  title,
}) => {
  const history = useHistory()
  const classes = useStyles()

  const routeChange = () => {
    let path = `/login`
    history.push(path)
  }
  return (
    <div>
      <HeaderRegistration />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="rp-button"
            onClick={routeChange}
          >
            Go back to the login page
          </Button>
        </div>
      </Container>
    </div>
  )
}
export default SuccessfulResetPasswordInfo
