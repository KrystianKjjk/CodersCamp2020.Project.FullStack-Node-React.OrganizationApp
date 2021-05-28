import React, { useState } from 'react'
import styles from './MyProfile.module.css'
import { CircularProgress, Button, Grid } from '@material-ui/core'
import StyledTextField from '../../../components/StyledTextField'
import PageHeader from '../../../components/PageHeader'
import useSnackbar from '../../../hooks/useSnackbar'
import { useUserMe } from '../../../hooks'
import { api } from '../../../api'

export interface MyProfileProps {}

const MyProfile = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isPasswordChange, setIsPasswordChange] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const { showError } = useSnackbar()
  const userID = localStorage.getItem('id') ?? ''
  const { data: user, isLoading, error } = useUserMe({
    enabled: !!userID,
  })

  const handleSubmit = async () => {
    const id = localStorage.getItem('id')
    try {
      await api.post('users/changepassword', {
        id,
        oldPassword,
        newPassword,
      })
      setPasswordChanged(true)
    } catch (error) {
      console.log(error)
      showError('Something went wrong :( Please try again')
    }
  }

  if (error) return <div className={styles.error}>Something went wrong :(</div>

  if (isLoading || !user) return <CircularProgress className={styles.loading} />

  if (isPasswordChange && !passwordChanged) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Please provide old and new password to proceed:</h2>
          <Grid container spacing={2} className={styles.passwordInput}>
            <Grid item xs={12}>
              <StyledTextField
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                name="password"
                label="Old Password"
                type="password"
                data-testid="r-password"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <Button
              id={styles.buttonAbort}
              onClick={() => setIsPasswordChange(!isPasswordChange)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }
  if (isPasswordChange && passwordChanged) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Your password had been changed :)</h2>
          <div>
            <Button
              id={styles.buttonConfirm}
              onClick={() => {
                setIsPasswordChange(!isPasswordChange)
                setPasswordChanged(false)
              }}
            >
              Cool, thank you!
            </Button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.myProfileContainer}>
      <PageHeader name="My Profile" />

      <div className={styles.teamProjectDetailsContainer}>
        <div className={styles.attributeNamesContainer}>
          <div>Name:</div>
          <div>Surname:</div>
          <div>Permission Level:</div>
          <div>Status:</div>
          <div>Email:</div>
          <br />
          <br />
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
          <br />
          <br />
          <div>
            <Button
              id={styles.buttonEdit}
              onClick={() => {
                setIsPasswordChange(!isPasswordChange)
              }}
            >
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile

const StatusLabel = (props: any) => {
  if (props.status === 0)
    return <label className={styles.status_radio_button__blue}>Active</label>
  else if (props.status === 1)
    return <label className={styles.status_radio_button__red}>Resigned</label>
  else
    return <label className={styles.status_radio_button__green}>Archived</label>
}

const PermissionLabel = (props: any) => {
  if (props.type === 1)
    return (
      <label className={styles.status_radio_button__blue}>Participant</label>
    )
  else if (props.type === 2)
    return <label className={styles.status_radio_button__red}>Mentor</label>
  else return <label className={styles.status_radio_button__green}>Admin</label>
}
