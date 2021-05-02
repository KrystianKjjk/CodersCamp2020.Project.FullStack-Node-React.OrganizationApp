import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Box, CircularProgress, Snackbar} from "@material-ui/core";
import {mainTheme} from "../../../theme/customMaterialTheme";
import {ThemeProvider} from "@material-ui/styles";
import MuiAlert from '@material-ui/lab/Alert';

import UserService from "../../../api/users.service";
import BaseService from "../../../app/baseService";
import {IUser} from "../../../models/User.model";
import {UserStatus as Status} from "../../../models/User.model";
import {UserType as Role} from "../../../models/User.model";
import ManageGrades from "../ManageGrades";
import UButton from "../../../components/UButton";
import styles from './ManageUser.module.css';
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import PageHeader from '../../../components/PageHeader';

export interface ManageUserProps {
}

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageUser: React.FC< ManageUserProps > = (props: any) => {

    const userService = new UserService(new BaseService());
    const history = useHistory();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [openDeleteError, setDeleteError] = React.useState(false);

    const [user, setUser] = useState<IUser | undefined>(undefined);

    let userID = props?.match?.params?.userID;

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function toggleEdit() {
        setIsEdit(!isEdit);
    }

    function handleInputChange(event: any) {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        if(!isNaN(value)) value = +value;
        // @ts-ignore
        setUser({
            ...user,
            [name]: value
        })
    }

    function getUser() {
        userService.getUser(userID)
            .then(res => {
                if (res.status === 200) {
                    setIsLoaded(true);
                    setUser(
                        {
                            name: res.data.name,
                            surname: res.data.surname,
                            type: res.data.type,
                            status: res.data.status,
                            email: res.data.email,
                        })
                } else {
                    throw Error;
                }
            }).catch(err => {
            setIsLoaded(true);
            setError(err);
        })
    }

    function updateUser() {
        userService.updateUser(userID, user as IUser)
            .then(res => {
                if (res.status === 200) {
                    toggleEdit();
                    setOpenSuccess(true);
                }
            })
            .catch(err => {
                setError(err);
                setOpenError(true);
            })
    }

    function deleteUser() {
        userService.deleteUser(userID)
            .then(res => {
                if (res.status === 200) {
                    history.push('/users');
                }
            })
            .catch(err => {
                setDeleteError(true);
            })
        handleCloseDeleteConfirmation();
    }


    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
        setDeleteError(false);
    };


    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const handleOpenDeleteConfirmation = () => {
        setIsOpenDelete(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setIsOpenDelete(false);
    };

    if (error) {
        return <div className={styles.error}>Error</div>;
    } else if (!isLoaded) {
        return <CircularProgress className={styles.loading}/>
    } else {
        return (
            <ThemeProvider theme={mainTheme}>
                <ConfirmationDialog
                    title="Are you sure you want to delete the user?"
                    content="This action is irreversible."
                    isOpen={isOpenDelete}
                    onClose={handleCloseDeleteConfirmation }
                    handleConfirm={deleteUser}
                    handleCancel={handleCloseDeleteConfirmation}
                />

                <Snackbar open={openSuccess} autoHideDuration={3500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        User updated correctly!
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={3500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        User not updated!
                    </Alert>
                </Snackbar>
                <Snackbar open={openDeleteError} autoHideDuration={3500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        User not deleted!
                    </Alert>
                </Snackbar>

                <PageHeader name={`Users${'/'+userID}`}/>  

                <Box className={styles.container}>
                    <Box display="flex" className={styles.container__header}>
                        <span>Manage user</span>
                        <div className={styles.container__header__button}>
                            <UButton
                                text='DELETE'
                                color='secondary'
                                onClick={handleOpenDeleteConfirmation} />
                            {isEdit ? (
                                <UButton
                                    text='SAVE'
                                    color='primary'
                                    onClick={updateUser} />
                            ) : (
                                <UButton
                                    text='EDIT'
                                    color='primary'
                                    onClick={toggleEdit}
                                />
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
                            `}>
                                {(isEdit || user?.status as Status === Status.Active) && (
                                    <>
                                        <input type="radio"
                                               id="Active"
                                               name="status"
                                               value={Status.Active}
                                               checked={user?.status as Status === Status.Active}
                                               onChange={handleInputChange}
                                        />
                                        <label className={`${styles.status_radio_button__blue}`} htmlFor="Active">Active</label>
                                    </>
                                )}

                                {(isEdit || user?.status as Status === Status.Resigned) && (
                                    <>
                                        <input type="radio"
                                               id="Resigned"
                                               name="status"
                                               value={Status.Resigned}
                                               checked={user?.status as Status === Status.Resigned}
                                               onChange={handleInputChange}
                                        />
                                        <label className={`${styles.status_radio_button__red}`} htmlFor="Resigned">Resigned</label>
                                    </>
                                )}

                                {(isEdit || user?.status as Status === Status.Archived) && (
                                    <>
                                        <input type="radio"
                                               id="Archived"
                                               name="status"
                                               value={Status.Archived}
                                               checked={user?.status as Status === Status.Archived}
                                               onChange={handleInputChange}
                                        />
                                        <label className={`${styles.status_radio_button__green}`} htmlFor="Archived">Archived</label>
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
                                    <input type="text"
                                           id="name"
                                           name="name"
                                           placeholder={user?.name}
                                           onChange={handleInputChange}/>
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
                                    <input type="text"
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
                                    <input type="text"
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
                                    <select name="type"
                                            value={user?.type}
                                            onChange={handleInputChange}
                                    >
                                        <option value={Role.Candidate}>Candidate</option>
                                        <option value={Role.Participant}>Participant</option>
                                        <option value={Role.Mentor}>Mentor</option>
                                        <option value={Role.Admin}>Admin</option>
                                    </select>
                                ) : (
                                    <p>{Role[user?.type!]}</p>
                                )}
                            </div>
                        </div>
                    </form>
                </Box>
                <ManageGrades userID={userID}/>
            </ThemeProvider>
        );
    }
}

export default ManageUser;
