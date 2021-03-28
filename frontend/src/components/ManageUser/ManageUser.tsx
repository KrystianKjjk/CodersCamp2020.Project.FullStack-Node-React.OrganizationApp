import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import styles from './ManageUser.module.css';

export interface ManageUserProps {

}
enum IRole {
    Candidate,
    Participant,
    Mentor,
    Admin,
};

enum IStatus {
    Active,
    Resigned,
    Archived,
};
interface IUser {
    name: string,
    surname: string,
    email: string,
    type: IRole,
    password: string,
    status: IStatus
};

const ManageUser: React.FC< ManageUserProps > = (props: any) => {
    // @ts-ignore
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);

    let userID = props.match.params.userID;

    const endpoint = `http://localhost:5000/api/users/${userID}`;

     useEffect(() => {
       fetch(endpoint,
            {
                method: "GET",
                headers: {
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU3ZTAyMGRhODU2ZTAwMTU4NDViZWEiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTcxNjgsImV4cCI6MTYxNjc5ODM2OH0.UnY8L7gVH-e3vXr86hxozWcBqOudSUPr9yKlN0RaMyo'
                },
        })
           .then(result => {
                if(result.ok){
                   return result.json();
                }
                else {
                    throw Error("Not 2xx response");
                }
            })
            .then(result => {
                setIsLoaded(true);
                setUser(result);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);

     function roleChange(event: any) {
         // @ts-ignore
         setUser({
             ...user,
             type: event.target.value
         });
    }
    function statusChange(event: any) {
        // @ts-ignore
        setUser({
            ...user,
            status: event.target.value
        });
    }

    if (error) {
        return <div>Error</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (

            <div>
                <div className={styles.container}>
                    <div className={styles.container__header}>
                        <span>Manage user</span>
                        <div className={styles.container__header__button}>
                            <button className={`${styles.button__red} ${styles.button}`}>DELETE</button>
                            <button className={`${styles.button__blue} ${styles.button}`}>SAVE</button>
                        </div>
                    </div>

                    <form className={styles.manageUserForm}>
                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="status">Status</label>
                            </div>
                            <div className={`${styles.manageUserForm__row__value} ${styles.status_radio_button}`}>
                                <input type="radio"
                                       id="Active"
                                       name="status"
                                       value={IStatus.Active}
                                       checked={user?.status == IStatus.Active}
                                       onChange={statusChange}
                                />
                                <label className={`${styles.status_radio_button__blue}`} htmlFor="Active">Active</label>

                                <input type="radio"
                                       id="Resigned"
                                       name="status"
                                       value={IStatus.Resigned}
                                       checked={user?.status == IStatus.Resigned}
                                       onChange={statusChange}
                                />
                                <label className={`${styles.status_radio_button__red}`} htmlFor="Resigned">Resigned</label>

                                <input type="radio"
                                       id="Archived"
                                       name="status"
                                       value={IStatus.Archived}
                                       checked={user?.status == IStatus.Archived}
                                       onChange={statusChange}
                                />
                                <label className={`${styles.status_radio_button__green}`} htmlFor="Archived">Archived</label>
                            </div>
                        </div>

                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="fname">First Name</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                <input type="text" id="fname" name="firstName" placeholder={user?.name}/>
                            </div>
                        </div>

                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="lname">Last Name</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                <input type="text" id="lname" name="lastName" placeholder={user?.surname}/>
                            </div>
                        </div>

                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                <input type="text" id="email" name="email" placeholder={user?.email}/>
                            </div>
                        </div>

                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="type">Type</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                <select name="Role*" value={user?.type} onChange={roleChange}>
                                    <option value={IRole.Candidate}>Candidate</option>
                                    <option value={IRole.Participant}>Participant</option>
                                    <option value={IRole.Mentor}>Mentor</option>
                                    <option value={IRole.Admin}>Admin</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}


export default ManageUser;

{/*
          <div className={styles.container}>
              <div className={styles.container__header}>
                  <span>User Grades</span>
                  <div className={styles.container__header__button}>
                      <button className={`${styles.button__blue} ${styles.button}`}>ADD</button>
                  </div>
              </div>
              <div className={styles.container__body}>
                  <div className={styles.gradeContainer}>
                      <div className={styles.gradeContainer__header}>
                          <span>Section name</span>
                      </div>
                      <div className={styles.gradeContainer__body}>
                          <ul className={styles.list}>
                              <li>Test: </li>
                              <li>Task: </li>
                              <li>Project: </li>
                          </ul>

                          <ul className={`${styles.list} ${styles.list__values}`}>
                              <li>80% </li>
                              <li>100% </li>
                              <li>80pkt</li>
                          </ul>
                      </div>
                      <button className={`${styles.button__red} ${styles.button}`}>DELETE</button>
                      <button className={`${styles.button__blue} ${styles.button}`}>EDIT</button>
                  </div>
                  <div className={styles.gradeContainer}>
                      <div className={styles.gradeContainer__header}>
                          <span>Section name</span>
                      </div>
                      <div className={styles.gradeContainer__body}>
                          <ul className={styles.list}>
                              <li>Test: </li>
                              <li>Task: </li>
                              <li>Project: </li>
                          </ul>

                          <ul className={`${styles.list} ${styles.list__values}`}>
                              <li>80% </li>
                              <li>100% </li>
                              <li>80pkt</li>
                          </ul>
                      </div>
                      <button className={`${styles.button__red} ${styles.button}`}>DELETE</button>
                      <button className={`${styles.button__blue} ${styles.button}`}>EDIT</button>
                  </div>
                  <div className={styles.gradeContainer}>
                      <div className={styles.gradeContainer__header}>
                          <span>Section name</span>
                      </div>
                      <div className={styles.gradeContainer__body}>
                          <ul className={styles.list}>
                              <li>Test: </li>
                              <li>Task: </li>
                              <li>Project: </li>
                          </ul>

                          <ul className={`${styles.list} ${styles.list__values}`}>
                              <li>80% </li>
                              <li>100% </li>
                              <li>80pkt</li>
                          </ul>
                      </div>
                      <button className={`${styles.button__red} ${styles.button}`}>DELETE</button>
                      <button className={`${styles.button__blue} ${styles.button}`}>EDIT</button>
                  </div>
              </div>
          </div>
      </div>

        <button className={styles.button__statusBlue}>Active</button>
        <button className={styles.button__statusRed}>Resigned</button>
        <button className={styles.button__statusGreen}>Archived</button>
      */}
