import React from "react";
import styles from "./Header.module.css";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { removeUserFromLocalStorage } from "../../app/utils";
import { useAppSelector } from "../../app/hooks";
import { Box } from "@material-ui/core";

const Header: React.FC = () => {
  const { activeCourse } = useAppSelector((state) => state.courseList);
  const handleLogOut = () => {
    removeUserFromLocalStorage();
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <span>.</span>Coders<span>Camp</span>
      </div>
      <div className={styles.activeCourseBox}>
        <p className={styles.activeCourse}>{activeCourse?.name}</p> 
        {/* <div>Active course: </div>
          <div className={styles.activeCourse}>{activeCourse?.name}</div> */}
        <div className={styles.logout} onClick={() => handleLogOut()}>
          <PowerSettingsNewIcon
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          ></PowerSettingsNewIcon>
          <span> Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
