import React, {useEffect, useState} from 'react';

import styles from './ManageUser.module.css';
import {IGrade, IRole, IStatus, IUser} from "../../models/user.model";

export interface ManageUserProps {

}

const ManageUser: React.FC< ManageUserProps > = (props: any) => {
    // @ts-ignore
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [user, setUser] = useState< IUser | undefined>(undefined);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU3ZTAyMGRhODU2ZTAwMTU4NDViZWEiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTcxNjgsImV4cCI6MTYxNjc5ODM2OH0.UnY8L7gVH-e3vXr86hxozWcBqOudSUPr9yKlN0RaMyo';

    let userID = props.match.params.userID;

    const userEndpoint = `https://coders-camp-organization-app.herokuapp.com/api/users/${userID}`;
    const gradeEndpoint = 'https://coders-camp-organization-app.herokuapp.com/api/grades/';

    function toggleEdit(){
        setIsEdited(!isEdited);
    }


     useEffect(() => {
         getUser();
    }, []);

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
                            {isEdited ? (
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
                                {(isEdited || user?.status == IStatus.Active) && (
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
                                )
                                  }
                                {(isEdited || user?.status == IStatus.Resigned) && (
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
                                {(isEdited || user?.status == IStatus.Archived) && (
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
                                <label htmlFor="fname">First Name</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                {isEdited ? (
                                    <input type="text"
                                    id="fname"
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
                                <label htmlFor="lname">Last Name</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                {isEdited ? (
                                    <input type="text"
                                           id="lname"
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
                                {isEdited ? (
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
                                {isEdited ? (
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
            </div>

        );
    };
}


export default ManageUser;
