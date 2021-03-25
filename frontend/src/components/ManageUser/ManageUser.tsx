import React from 'react';
import styles from './ManageUser.module.css';
import {Breadcrumbs, Button, Container, createMuiTheme, Link, Typography} from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core';
import classes from "*.module.css";

export interface ManageUserProps {

}

const ManageUser: React.FC< ManageUserProps > = props => {
  return (
      <div>
          <div className={styles.container}>
              <div className={styles.container__header}>
                  <span>Manage user</span>
                  <div className={styles.container__header__button}>
                      <button className={`${styles.button__red} ${styles.button}`}>DELETE</button>
                      <button className={`${styles.button__blue} ${styles.button}`}>EDIT</button>
                  </div>
              </div>
              <div className={styles.container__body}>
                  <ul className={styles.list}>
                      <li>Status: </li>
                      <li>First name: </li>
                      <li>Last name: </li>
                      <li>Email: </li>
                      <li>Type: </li>
                  </ul>

                  {/*<ul className={`${styles.list} ${styles.list__values}`}>
                      <li>Active </li>
                      <li>Janusz </li>
                      <li>Kowalski </li>
                      <li>janusz.kowalski@gmail.com </li>
                      <li>Participant </li>
                  </ul>*/}

                  <form className={`${styles.list}`}>
                      <li>
                          <button className={styles.button__statusGreen}>Active</button>
                          <button>Active</button>
                          <button>Active</button>
                      </li>
                      <li><input type="text" name="firstName"/> </li>
                      <li><input type="text" name="lastName"/> </li>
                      <li><input type="text" name="email" /> </li>
                      <li><select name="Participant*">
                          <option value="volvo">Participant</option>
                          <option value="saab">Mentor</option>
                          <option value="mercedes">Admin</option>
                      </select></li>
                  </form>

              </div>
          </div>

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


  );
};

export default ManageUser;
