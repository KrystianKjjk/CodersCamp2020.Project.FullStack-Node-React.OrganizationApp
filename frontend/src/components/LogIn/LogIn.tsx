import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';

import StyledTextField from '../StyledTextField'
import useStyles from './LogIn.style';
import BaseService from '../../app/baseService';
import { setLoggedInUserId } from './LogInSlice';
import { useAppDispatch } from '../../app/hooks';

export interface LogInProps {

};

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSignInClick = async () => {
    const service = new BaseService;
    try {
      const response = await service.post('login', { email, password})
      setFormError('');
      const token: any = response?.headers?.['x-auth-token'];
      localStorage.setItem('token', token);
      dispatch(setLoggedInUserId(response?.data?._id || ''));
    }
    catch (error) {setFormError(error?.response?.data?.message)};
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <StyledTextField
            margin="normal"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            data-testid='li-email'
          />
          <StyledTextField
            margin="normal"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            data-testid='li-password'
          />
          {formError && <FormHelperText error>{'Error: ' + formError}</FormHelperText>}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignInClick}
            data-testid='li-button'
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="inherit">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" color="inherit">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}