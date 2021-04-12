import React, {useEffect} from "react";
import styles from "./HomePage.module.css";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PageHeader from "../PageHeader";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectUserData} from "./HomePageSlice";

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {

    const dispatch = useDispatch();
    const {userData, loaded} = useSelector(selectUserData);

    useEffect(() => {
        if(!loaded) {
            const userID = localStorage.getItem('id');
            dispatch(fetchUser(userID));
        }
    }, []);


    return (
    <div className={styles.container}>
      <PageHeader name={`Hello ${userData?.name}!`}/>
      <div className={styles.description}> 
        <div><NotificationsIcon fontSize="large" style={{paddingRight:"20px"}}></NotificationsIcon><h2> Next event</h2></div>
        <div><h2>Java Script Section Test - 22.01.2021</h2></div>
      </div>
    </div>
  );
};

export default HomePage;
