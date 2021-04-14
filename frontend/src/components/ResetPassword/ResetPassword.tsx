import React, { useState } from 'react';
import {
  Button, 
  CssBaseline,
  Typography,
  Container,
  Snackbar,  
  FormHelperText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StyledTextField from '../StyledTextField'
import HeaderRegistration from '../HeaderRegistration';
import BaseService from '../../app/baseService';
import MuiAlert, { AlertProps }  from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

export interface ResetPasswordProps {

};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ResetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [beenSent, setBeenSent] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const service = new BaseService();
    try {
      await service.post('users/requestpasswordreset', { email })
      setBeenSent(true);
    }
    catch (error) {
      setError("Incorrect email!");
      setOpenError(true);
      console.log(error);
    };
  };

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const history = useHistory();
  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  }

  return (
    !beenSent ? (
      <div>
        <HeaderRegistration />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Reset Password
        </Typography>
            <div className={classes.form}
            >
              <StyledTextField
                margin="normal"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                data-testid="rp-email"
                onChange={e => setEmail(e.target.value)}
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
          <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError} data-testid='li-snack'>
            <Alert onClose={handleCloseError} severity="error">
              {error && <FormHelperText >{error}</FormHelperText>}
            </Alert>
          </Snackbar>

        </Container>
      </div>
    )
    :
    (
      <div>
        <HeaderRegistration />
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Email with reset link has been sent!
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
  );
}