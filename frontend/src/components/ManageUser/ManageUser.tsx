import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Box, Breadcrumbs, CircularProgress, Container, Link, Snackbar, Typography} from "@material-ui/core";
import {mainTheme, UButtonTheme} from "../../theme/customMaterialTheme";
import {ThemeProvider} from "@material-ui/styles";
import MuiAlert from '@material-ui/lab/Alert';

import UserService from "../../api/users.service";
import BaseService from "../../app/baseService";
import {IRole, IStatus, IUser} from "../../models/user.model";
import ManageGrades from "../ManageGrades";
import UButton from "../UButton";

import styles from './ManageUser.module.css';


export interface ManageUserProps {
    userID: string;
}
function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageUser: React.FC< ManageUserProps > = (props: any) => {

    const baseAPIUrl = `https://coders-camp-organization-app.herokuapp.com/api/`;

    const userService = new UserService(baseAPIUrl, new BaseService());
    const history = useHistory();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

    let userID = props.userID;

    useEffect(() => {
        getUser();
    }, []);


    function toggleEdit() {
        setIsEdit(!isEdit);
    }

    function handleInputChange(event: any) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
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
                setError(err);
            })
    }


    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };

    if (error) {
        return <div className={styles.error}>Error</div>;
    } else if (!isLoaded) {
        return <CircularProgress className={styles.loading}/>
    } else {
        return (
            <ThemeProvider theme={mainTheme}>

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

                <Breadcrumbs aria-label="breadcrumb" color="primary"
                             style={{
                                 backgroundColor: '#1c1c1c',
                                 border: '1px solid #666666',
                                 borderRadius: '.2rem',
                                 padding: '1rem',
                                 margin: '1rem 0'
                             }}>
                    <Link href="/users" color="primary">USERS </Link>
                    <Typography color="primary">{userID}</Typography>
                </Breadcrumbs>

                <Box className={styles.container}>
                    <Box display="flex" className={styles.container__header}>
                        <span>Manage user</span>
                        <div className={styles.container__header__button}>
                            <UButton
                                text='DELETE'
                                color='secondary'
                                onClick={deleteUser} />
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
                                {(isEdit || user?.status == IStatus.Active) && (
                                    <div>
                                        <input type="radio"
                                               id="Active"
                                               name="status"
                                               value={IStatus.Active}
                                               checked={user?.status == IStatus.Active}
                                               onChange={handleInputChange}
                                        />
                                        <label className={`${styles.status_radio_button__blue}`} htmlFor="Active">Active</label>
                                    </div>
                                )}

                                {(isEdit || user?.status == IStatus.Resigned) && (
                                    <div>
                                        <input type="radio"
                                               id="Resigned"
                                               name="status"
                                               value={IStatus.Resigned}
                                               checked={user?.status == IStatus.Resigned}
                                               onChange={handleInputChange}
                                        />
                                        <label className={`${styles.status_radio_button__red}`} htmlFor="Resigned">Resigned</label>
                                    </div>
                                )}

                                {(isEdit || user?.status == IStatus.Archived) && (
                                    <div>
                                        <input type="radio"
                                               id="Archived"
                                               name="status"
                                               value={IStatus.Archived}
                                               checked={user?.status == IStatus.Archived}
                                               onChange={handleInputChange}
                                        />
                                        <label className={`${styles.status_radio_button__green}`} htmlFor="Archived">Archived</label>
                                    </div>
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
                                        <option value={IRole.Candidate}>Candidate</option>
                                        <option value={IRole.Participant}>Participant</option>
                                        <option value={IRole.Mentor}>Mentor</option>
                                        <option value={IRole.Admin}>Admin</option>
                                    </select>
                                ) : (
                                    <p>{IRole[user?.type!]}</p>
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
