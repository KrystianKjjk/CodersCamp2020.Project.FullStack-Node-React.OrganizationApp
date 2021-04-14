import React from "react";
import styles from "./Header.module.css";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { removeUserFromLocalStorage } from "../../app/utils";
import {useHistory} from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface HeaderProps {
  onLogout?: Function;
}

const Header = (props: HeaderProps) => {
  // const Header: React.FC = () => {
  const { activeCourse } = useAppSelector((state) => state.courseList);
  const handleLogOut = () => {
    removeUserFromLocalStorage();
  };

  const history = useHistory();
  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

    const takeHome = () => {
        let path = `/home`;
        history.push(path);
    };

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={takeHome} style={{cursor: "pointer"}}>
            <span>.</span>Coders<span>Camp</span>
      </div>
      <div className={styles.activeCourseBox}>
        <p className={styles.activeCourse}>{activeCourse?.name}</p>
        <div
          className={styles.logout}
          onClick={() => {
            handleLogOut();
            routeChange();
            if (props.onLogout) props.onLogout();
          }}
        >
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
