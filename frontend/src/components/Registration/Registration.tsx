import React, { useState } from 'react';

import {
  Button, 
  CssBaseline,
  Link,
  Grid,
  Typography,
  Container,
  FormHelperText,
  Snackbar
} from '@material-ui/core';
import MuiAlert, { AlertProps }  from '@material-ui/lab/Alert';
import StyledTextField from '../StyledTextField';
import BaseService from '../../app/baseService';
import useStyles from './Registration.style';
import HeaderRegistration from '../HeaderRegistration';

export interface RegistrationProps {
  
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  
  const handleCloseSnackbar = (setStateFunction: (newValue: boolean) => void) => (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setStateFunction(false);
  };
  
  const handleSignUpClick = async () => {
    const service = new BaseService();
    try {
      setFormError('');
      await service.post('register', {name, surname, email, password, confirmPassword})
      setOpen(true);
    }
    catch (error) {
      setOpenError(true);
      setFormError(error?.response?.data?.message)
    };
  }; 

  const areAllFieldsFilled = name && surname && email && password && confirmPassword;

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
                onChange={e => setName(e.target.value)}
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
                onChange={e => setSurname(e.target.value)}
                label="Surname"
                name="lastName"
                autoComplete="lname"
                data-testid="r-lname"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email Address"
                name="email"
                autoComplete="email"
                data-testid="r-email"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                data-testid="r-password"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
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
              disabled:classes.buttonDisabled
            }}
            data-testid="r-button"
          >
            Sign Up
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar(setOpen)} data-testid="r-snack-success">
            <Alert onClose={handleCloseSnackbar(setOpen)} severity="success">
              Registration completed. You can log in now.
            </Alert>
          </Snackbar>

          <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseSnackbar(setOpenError)} data-testid="r-snack-error">
            <Alert onClose={handleCloseSnackbar(setOpenError)} severity="error">
              {formError && <FormHelperText className={classes.errorStyle}>{formError}</FormHelperText>}
            </Alert>
          </Snackbar>
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
  );
}