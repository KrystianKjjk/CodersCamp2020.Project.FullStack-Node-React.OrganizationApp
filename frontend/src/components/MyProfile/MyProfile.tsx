import React, {useState, useEffect} from 'react';
import styles from './MyProfile.module.css';
import UserService from "../../api/users.service";
import BaseService from "../../app/baseService";
import {CircularProgress} from "@material-ui/core";
import {IUser} from "../../models/User.model";

export interface MyProfileProps {
}

const MyProfile = () => {
  const userService = new UserService(new BaseService());

  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

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

if (error) {
  return <div className={styles.error}>Something went wrong :(</div>;
} else if (!isLoaded || !user) {
  return <CircularProgress className={styles.loading}/>
} else {
  return (
    <div className={styles.myProfileContainer}>
        <div className={styles.teamProjectHeader}>
          <span className={styles.teamProjectHeaderName}>My Profile</span>
        </div>

        <div className={styles.teamProjectDetailsContainer}>
          <div className={styles.attributeNamesContainer}>
            <div>Name:</div>
            <div>Surname:</div>
            <div>Permission Level:</div>
            <div>Status:</div>
            <div>Email:</div>
          </div>
          <div className={styles.attributeValuesContainer}>
            <div>{user.name}</div>
            <div>{user.surname}</div>
            <div>
                <PermissionLabel type={user.type}/>
            </div>
            <div><StatusLabel status={user.status}/></div>
            <div>{user.email}</div>
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