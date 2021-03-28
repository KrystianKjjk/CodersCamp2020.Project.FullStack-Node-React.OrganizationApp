import React from "react";
import styles from "./HomePage.module.css";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PageHeader from "../PageHeader";

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <div className={styles.container}>
      <PageHeader name={"Hello name!"}/>
      <div className={styles.description}> 
        <div><NotificationsIcon fontSize="large" style={{paddingRight:"20px"}}></NotificationsIcon><h2> Next event</h2></div>
        <div><h2>Java Script Section Test - 22.01.2021</h2></div>
      </div>
    </div>
  );
};

export default HomePage;
