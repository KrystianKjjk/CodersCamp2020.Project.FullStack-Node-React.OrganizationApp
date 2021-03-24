import React from "react";
import styles from "./MainView.module.css";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import ContentBox from "../../components/ContentBox";

export interface MainViewProps {}

const MainView: React.FC<MainViewProps> = (props) => {
  return (
    <div className={styles.mainContainer}>
      <Header/>
      <div className={styles.container}>
        <Menu />
        <ContentBox />
      </div>
    </div>
  );
};

export default MainView;
