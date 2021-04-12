import React, { useState } from 'react';

import {
  Button, 
  CssBaseline,
  Typography,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import StyledTextField from '../StyledTextField'
import HeaderRegistration from '../HeaderRegistration';
import PasswordResetService from '../../api/PasswordReset.service'

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

export default function ResetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [beenSent, setBeenSent] = useState(false);

  const handleChange = (setState: Function, e: any) => {
    setState(e.target.value);
  }

  const passwordResetApi = new PasswordResetService();

  const sendPasswordReset = async () => {
    const result = await passwordResetApi.sendPasswordReset(email);
    setBeenSent(result);
  }

  return (
<div>
<HeaderRegistration />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Reset Password
        </Typography>
        <form className={classes.form} noValidate
        onSubmit={sendPasswordReset}
        >
          <StyledTextField
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            data-testid="rp-email"
            onChange = {(e) => {handleChange(setEmail, e)}}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="rp-button"  
          >
            Send
          </Button>
        </form>
      </div>
    </Container>
    </div>
  );
}