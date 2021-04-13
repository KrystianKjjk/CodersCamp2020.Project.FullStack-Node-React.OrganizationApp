import React, {useEffect, useState} from "react";
import styles from "./HomePage.module.css";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PageHeader from "../PageHeader";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectUserData} from "./HomePageSlice";

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {

    const dispatch = useDispatch();
    const {loaded} = useSelector(selectUserData);
    const [course, setCourse] = useState<any>(null);

    useEffect(() => {
        if(!loaded) {
            const userID = localStorage.getItem('id');
            dispatch(fetchUser(userID));
        }
        setCourse(JSON.parse( localStorage.getItem('activeCourse')! ));
    }, []);


    return (
    <div className={styles.container}>
      <PageHeader name="HOMEPAGE"/>
      <div className={styles.description}> 
        <div><NotificationsIcon fontSize="large" style={{paddingRight:"20px"}}></NotificationsIcon><h2> Next event</h2></div>
        <div>
            {
                course ? (
                    <div style={{display: "block", textAlign: "center"}}>
                        <h1>{course?.name}</h1>
                        <h3 style={{marginTop: "2rem"}}>Start date: { new Date(course?.startDate).toLocaleDateString() }</h3>
                        <p style={{marginTop: "2rem"}}>{course?.description}</p>
                    </div>
                ) : (
                    <h2>Java Script Section Test - 22.01.2021</h2>
                )
            }
        </div>
      </div>
    </div>
  );
};

export default HomePage;
