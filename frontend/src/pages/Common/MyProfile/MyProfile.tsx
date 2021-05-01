import React, { useState, useEffect } from 'react';
import styles from './MyProfile.module.css';
import UserService from "../../../api/users.service";
import BaseService from "../../../app/baseService";
import {
  CircularProgress,
  Button,
  Grid,
  Snackbar,
  FormHelperText
} from "@material-ui/core";
import { IUser } from "../../../models/User.model";
import StyledTextField from '../../../components/StyledTextField'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import PageHeader from '../PageHeader';

export interface MyProfileProps {
}

const MyProfile = () => {
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);  
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [openError, setOpenError] = useState(false);

  const userService = new UserService(new BaseService());
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getUser() {
    const userId = localStorage.getItem('id');
    if (!userId) return null
    userService.getUser(userId)
      .then(res => {
        if (res.status === 200) {
          setUser(
            {
              name: res.data.name,
              surname: res.data.surname,
              type: res.data.type,
              status: res.data.status,
              email: res.data.email,
            })
          setIsLoaded(true);
        } else {
          throw Error;
        }
      }).catch(err => {
        setError(err);
        setIsLoaded(true);
      })
  }

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const handleSubmit = async () => {
    const service = new BaseService();
    const id = localStorage.getItem('id');
    try {
      await service.post('users/changepassword', { id, oldPassword, newPassword })
      setPasswordChanged(true);
    }
    catch (error) {
      console.log(error)
      setOpenError(true);
    };
  };

  if (error) {
    return <div className={styles.error}>Something went wrong :(</div>;
  } else if (!isLoaded || !user) {
    return <CircularProgress className={styles.loading} />
  } if (isPasswordChange && !passwordChanged) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Please provide old and new password to proceed:</h2>
          <Grid container spacing={2} className={styles.passwordInput}>
            <Grid item xs={12}>
              <StyledTextField
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                name="password"
                label="Old Password"
                type="password"
                data-testid="r-password"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                name="passwordconfirm"
                label="New Password"
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
            id={styles.buttonEditPassword}
            data-testid="rp-button"
            onClick={handleSubmit}
          >
            Send
        </Button>
          <div>
            <Button id={styles.buttonAbort} onClick={() => setIsPasswordChange(!isPasswordChange)}>Cancel</Button>
          </div>
        </div>

        <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError} data-testid='li-snack'>
          <Alert onClose={handleCloseError} severity="error">
            <FormHelperText >Something went wrong :( Please try again</FormHelperText>
          </Alert>
        </Snackbar>
      </div>)
  }
  else if (isPasswordChange && passwordChanged) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Your password had been changed :)</h2>
          <div>
            <Button id={styles.buttonConfirm} onClick={() => {
              setIsPasswordChange(!isPasswordChange);
              setPasswordChanged(false);
            }
            }>Cool, thank you!</Button>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className={styles.myProfileContainer}>
        <PageHeader name="My Profile"/>

        <div className={styles.teamProjectDetailsContainer}>
          <div className={styles.attributeNamesContainer}>
            <div>Name:</div>
            <div>Surname:</div>
            <div>Permission Level:</div>
            <div>Status:</div>
            <div>Email:</div>
            <br /><br />
            <div>Change password</div>
          </div>
          <div className={styles.attributeValuesContainer}>
            <div>{user.name}</div>
            <div>{user.surname}</div>
            <div>
              <PermissionLabel type={user.type} />
            </div>
            <div>
              <StatusLabel status={user.status} />
            </div>
            <div>{user.email}</div>
            <br /><br />
            <div>
              <Button id={styles.buttonEdit} onClick={() => { setIsPasswordChange(!isPasswordChange) }}>Change</Button>
            </div>
          </div>
        </div>       
      </div>
    )
  }
};

export default MyProfile;

const StatusLabel = (props: any) => {
  if (props.status === 0) return (
    <label className={styles.status_radio_button__blue}>Active</label>
  )
  else if (props.status === 1) return (
    <label className={styles.status_radio_button__red}>Resigned</label>
  )
  else return (
    <label className={styles.status_radio_button__green}>Archived</label>
  )
}

const PermissionLabel = (props: any) => {
  if (props.type === 1) return (
    <label className={styles.status_radio_button__blue}>Participant</label>
  )
  else if (props.type === 2) return (
    <label className={styles.status_radio_button__red}>Mentor</label>
  )
  else return (
    <label className={styles.status_radio_button__green}>Admin</label>
  )
}