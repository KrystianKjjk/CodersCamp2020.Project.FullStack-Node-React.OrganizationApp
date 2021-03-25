import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import StyledTextField from '../StyledTextField';
import BaseService from '../../app/baseService';


export interface RegistrationProps {
  
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');

  const handleSignUpClick = () => {
    const service = new BaseService;
    service.post('register', {name, surname, email, password, passwordConfirm})
    .catch(e => console.log(e)); 
  };


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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                value={surname}
                onChange={e => setSurname(e.target.value)}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                value={passwordConfirm}
                onChange={e => setConfirmPassword(e.target.value)}
                name="passwordconfirm"
                label="Confirm Password"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignUpClick}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" color="inherit">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}