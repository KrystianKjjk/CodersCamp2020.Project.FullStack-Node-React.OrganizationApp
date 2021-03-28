import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';

import StyledTextField from '../StyledTextField';
import BaseService from '../../app/baseService';
import useStyles from './Registration.style';

export interface RegistrationProps {
  
};

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSignUpClick = async () => {
    const service = new BaseService;
    try {
      const response = await service.post('register', {name, surname, email, password, confirmPassword})
      setFormError('');
    }
    catch (error) {setFormError(error?.response?.data?.message)};

  }; 

  const areAllFieldsFilled = name && surname && email && password && confirmPassword;

  return (
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
                label="First Name"
                data-testid="r-fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                value={surname}
                onChange={e => setSurname(e.target.value)}
                label="Last Name"
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
          {formError && <FormHelperText error>{'Error: ' + formError}</FormHelperText>}
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" color="inherit">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}