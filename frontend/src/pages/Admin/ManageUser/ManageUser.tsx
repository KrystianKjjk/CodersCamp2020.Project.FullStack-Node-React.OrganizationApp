import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Box, CircularProgress } from '@material-ui/core'
import { mainTheme } from '../../../theme/customMaterialTheme'
import { ThemeProvider } from '@material-ui/styles'

import { convertUserToIUser, IUser, userStatusDict, userTypeDict } from '../../../models/User.model'
import { UserStatus as Status } from '../../../models/User.model'
import { UserType as Role } from '../../../models/User.model'
import ManageGrades from '../ManageGrades'
import UButton from '../../../components/UButton'
import styles from './ManageUser.module.css'
import DeleteButton from '../../../components/DeleteButton'
import ReusableGoBack from '../../../components/ReusableGoBack'
import PageHeader from '../../../components/PageHeader'
import { useDeleteUser, useUpdateUser, useUser } from '../../../hooks'
import useSnackbar from '../../../hooks/useSnackbar'

export interface ManageUserProps {}

const ManageUser: React.FC<ManageUserProps> = (props: any) => {
  const history = useHistory()

  const [isEdit, setIsEdit] = useState(false)
  const [userToSave, setUserToSave] = useState<IUser | undefined>()
  const { showError } = useSnackbar()

  let { userID } = useParams<{userID: string}>()
  const { data: user, isLoading, error } = useUser(userID)
  const { mutate: updateUser } = useUpdateUser({
    successMessage: 'User updated correctly!',
    errorMessage: 'User not updated!',
    onSuccess: toggleEdit,
    invalidate: ['user', userID],
    newData: ([id, newUser], previousData) => ({
      ...previousData,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      type: userTypeDict[newUser.type],
      status: userStatusDict[newUser.status],
    }),
  })
  const { mutate: deleteUser } = useDeleteUser({
    successMessage: 'User deleted!',
    errorMessage: 'User not deleted!',
    onSuccess: () => history.push('/users'),
    newData: (id, previousData) =>
      previousData.filter((user) => user.id !== id),
  })

  useEffect(() => {
    if (user) setUserToSave(convertUserToIUser(user))
  }, [user])

  function toggleEdit() {
    setIsEdit(!isEdit)
  }

  function handleInputChange(event: any) {
    const target = event.target
    const name = target.name
    let value = target.value
    if (!isNaN(value)) value = +value
    // @ts-ignore
    setUserToSave({
      ...userToSave,
      [name]: value,
    })
  }

  if (error) showError((error as Error).message)

  if (isLoading) return <CircularProgress className={styles.loading} />

  return (
    <ThemeProvider theme={mainTheme}>
      <PageHeader>
        <ReusableGoBack
          pageName="Users"
          pageLink="/users"
          elementName={`${user?.name} ${user?.surname}`}
        />
      </PageHeader>

      <Box className={styles.container}>
        <Box display="flex" className={styles.container__header}>
          <span>Manage user</span>
          <div className={styles.container__header__button}>
            <DeleteButton
              confirmTitle={`Are you sure you want to delete the user?`}
              onConfirm={() => deleteUser(userID)}
            />
            {isEdit ? (
              <UButton
                text="SAVE"
                color="primary"
                onClick={() => updateUser([userID, userToSave!])}
              />
            ) : (
              <UButton text="EDIT" color="primary" onClick={toggleEdit} />
            )}
          </div>
        </Box>

        <form className={styles.manageUserForm}>
          <div className={styles.manageUserForm__row}>
            <div className={styles.manageUserForm__row__key}>
              <label htmlFor="status">Status</label>
            </div>
            <div
              className={`
                          ${styles.manageUserForm__row__value}
                          ${styles.status_radio_button}
                          ${isEdit && styles.status_radio_button__edit}
                      `}
            >
              {(isEdit || (userToSave?.status as Status) === Status.Active) && (
                <>
                  <input
                    type="radio"
                    id="Active"
                    name="status"
                    value={Status.Active}
                    checked={(userToSave?.status as Status) === Status.Active}
                    onChange={handleInputChange}
                  />
                  <label
                    className={`${styles.status_radio_button__blue}`}
                    htmlFor="Active"
                  >
                    Active
                  </label>
                </>
              )}

              {(isEdit ||
                (userToSave?.status as Status) === Status.Resigned) && (
                <>
                  <input
                    type="radio"
                    id="Resigned"
                    name="status"
                    value={Status.Resigned}
                    checked={(userToSave?.status as Status) === Status.Resigned}
                    onChange={handleInputChange}
                  />
                  <label
                    className={`${styles.status_radio_button__red}`}
                    htmlFor="Resigned"
                  >
                    Resigned
                  </label>
                </>
              )}

              {(isEdit ||
                (userToSave?.status as Status) === Status.Archived) && (
                <>
                  <input
                    type="radio"
                    id="Archived"
                    name="status"
                    value={Status.Archived}
                    checked={(userToSave?.status as Status) === Status.Archived}
                    onChange={handleInputChange}
                  />
                  <label
                    className={`${styles.status_radio_button__green}`}
                    htmlFor="Archived"
                  >
                    Archived
                  </label>
                </>
              )}
            </div>
          </div>

          <div className={styles.manageUserForm__row}>
            <div className={styles.manageUserForm__row__key}>
              <label htmlFor="name">First Name</label>
            </div>
            <div className={styles.manageUserForm__row__value}>
              {isEdit ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={user?.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{user?.name}</p>
              )}
            </div>
          </div>

          <div className={styles.manageUserForm__row}>
            <div className={styles.manageUserForm__row__key}>
              <label htmlFor="surnname">Last Name</label>
            </div>
            <div className={styles.manageUserForm__row__value}>
              {isEdit ? (
                <input
                  type="text"
                  id="surnname"
                  name="surname"
                  placeholder={user?.surname}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{user?.surname}</p>
              )}
            </div>
          </div>

          <div className={styles.manageUserForm__row}>
            <div className={styles.manageUserForm__row__key}>
              <label htmlFor="email">Email</label>
            </div>
            <div className={styles.manageUserForm__row__value}>
              {isEdit ? (
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder={user?.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{user?.email}</p>
              )}
            </div>
          </div>

          <div className={styles.manageUserForm__row}>
            <div className={styles.manageUserForm__row__key}>
              <label htmlFor="type">Type</label>
            </div>
            <div className={styles.manageUserForm__row__value}>
              {isEdit ? (
                <select
                  name="type"
                  value={userToSave?.type}
                  onChange={handleInputChange}
                >
                  <option value={Role.Candidate}>Candidate</option>
                  <option value={Role.Participant}>Participant</option>
                  <option value={Role.Mentor}>Mentor</option>
                  <option value={Role.Admin}>Admin</option>
                </select>
              ) : (
                <p>{Role[userToSave?.type!]}</p>
              )}
            </div>
          </div>
        </form>
      </Box>
      <ManageGrades userID={userID} />
    </ThemeProvider>
  )
}

export default ManageUser
