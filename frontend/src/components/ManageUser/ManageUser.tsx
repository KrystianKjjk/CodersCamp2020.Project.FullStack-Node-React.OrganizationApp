import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import UserService from "../../api/users.service";
import BaseService from "../../app/baseService";
import {IRole, IStatus, IUser} from "../../models/user.model";
import ManageGrades from "../ManageGrades";

import styles from './ManageUser.module.css';

export interface ManageUserProps {

}

const ManageUser: React.FC< ManageUserProps > = (props: any) => {

    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU3ZTAyMGRhODU2ZTAwMTU4NDViZWEiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTcxNjgsImV4cCI6MTYxNjc5ODM2OH0.UnY8L7gVH-e3vXr86hxozWcBqOudSUPr9yKlN0RaMyo';

    const baseAPIUrl = `https://coders-camp-organization-app.herokuapp.com/api/`;

    const userService = new UserService(baseAPIUrl, new BaseService());
    const history = useHistory();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState< IUser | undefined>(undefined);

    let userID = props.match.params.userID;

    useEffect(() => {
        getUser();
    }, []);


    function toggleEdit(){
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
                if(res.status === 200)
                {
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
            }).catch( err => {
                setIsLoaded(true);
                setError(err);
        })
    }
    function updateUser() {
        userService.updateUser(userID, user as IUser)
            .then(res => {
                if(res.status === 200 ) toggleEdit();
            })
            .catch(err => {
                setError(err);
            })
    }

    function deleteUser() {
        userService.deleteUser(userID)
            .then(res => {
                if(res.status === 200) {
                    history.push('/users');
                }
            })
            .catch( err => {
                setError(err);
            })
    }

    if (error) {
        return <div className={styles.error}>Error</div>;
    } else if (!isLoaded) {
        return <div className={styles.loading}>Loading...</div>;
    } else {
        return (
            <div>

                <div className={styles.container}>
                    <div className={styles.container__header}>
                        <span>Manage user</span>
                        <div className={styles.container__header__button}>
                            <button
                                className={`${styles.button__red} ${styles.button}`}
                                onClick={deleteUser}
                            > DELETE </button>
                            {isEdit ? (
                                <button
                                    className={`${styles.button__blue} ${styles.button}`}
                                    onClick={updateUser}
                                > SAVE </button>
                            ) : (
                                <button
                                    className={`${styles.button__blue} ${styles.button}`}
                                    onClick={toggleEdit}
                                > EDIT </button>
                            )}
                        </div>
                    </div>

                    <form className={styles.manageUserForm}>

                        <div className={styles.manageUserForm__row}>

                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="status">Status</label>
                            </div>

                            <div className={`${styles.manageUserForm__row__value} ${styles.status_radio_button}`}>
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
                </div>
                <ManageGrades userID={userID}/>
            </div>
        );
    }
}

export default ManageUser;
