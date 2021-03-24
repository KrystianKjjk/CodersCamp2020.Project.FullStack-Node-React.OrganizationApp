import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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
  },

  cssLabel: {
    color : '#FFF !important'
  },

  cssFocused: { },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#696969'
  },

  outlinedInput: {
    '&$cssFocused $notchedOutline': {
      border: '1px solid #FFF'
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();

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
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssLabel
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssLabel
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssLabel
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssLabel
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordconfirm"
                label="Confirm Password"
                type="passwordconfirm"
                id="passwordconfirm"
                autoComplete="current-password"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssLabel
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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