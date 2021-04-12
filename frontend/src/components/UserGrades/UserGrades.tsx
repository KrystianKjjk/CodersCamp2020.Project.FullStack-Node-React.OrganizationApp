import React, {useEffect, useState} from 'react';
import styles from './UserGrades.module.css';
import {Box, Breadcrumbs, CircularProgress, Link, Snackbar, Typography} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {mainTheme} from "../../theme/customMaterialTheme";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectUserData} from "../HomePage/HomePageSlice";
import {Grade} from "../../models";

export interface UserGradesProps {
}

const UserGrades: React.FC< UserGradesProps > = props => {

    const dispatch = useDispatch();
    const {userData, loaded, error} = useSelector(selectUserData);

    useEffect(() => {
        if(!loaded) {
            const userID = localStorage.getItem('id');
            dispatch(fetchUser(userID));
        }
    }, []);

  function getColor(percentage: number) {
      if( percentage > 90 ) return '#3E66FB';
      else if (percentage > 50) return '#3CC13B';
      else if (percentage > 30) return '#FCE205';
      else return '#FF384A';
  }

  if (error) {
    return <div className={styles.error}>Error</div>;
  } else if (!loaded) {
    return <CircularProgress className={styles.loading}/>
  } else {
    return (
        <ThemeProvider theme={mainTheme}>
            {console.log(userData)}
          <Breadcrumbs aria-label="breadcrumb" color="primary" className={styles.breadcrumbs}>
            <Typography color="primary">MY GRADES</Typography>
          </Breadcrumbs>

          <Box className={styles.container}>
            <Box display="flex" className={styles.container__header}>
              <span>My Grades</span>
            </Box>
              {!userData?.grades.length ? (
                  <h1 style={{margin: "3rem", fontWeight: 500}}>No grades yet.</h1>
              ):(
                  <table style={{width: "100%"}} className={styles.container__body}>
                      <tr>
                          <th></th>
                          <th>Test</th>
                          <th>Task</th>
                          <th>Project</th>
                      </tr>
                      {userData?.grades.map( (grade: Grade) =>{

                          const testPointsPer = grade?.testMaxPoints
                              ? Math.round((grade?.testPoints || 0) / grade.testMaxPoints * 100)
                              : 0;

                          const taskPointsPer = grade?.taskMaxPoints
                              ? Math.round((grade?.taskPoints || 0) / grade.taskMaxPoints * 100)
                              : 0;



                          return (
                              <tr>
                                  <th>Section 1</th>
                                  <td>
                                      <span className={styles.table__percentage} style={{color: getColor(testPointsPer)}}>{testPointsPer}%</span>
                                      <span className={styles.table__points}>{grade?.testPoints} / {grade?.testMaxPoints}</span>
                                  </td>
                                  <td>
                                      <span className={styles.table__percentage} style={{color: getColor(taskPointsPer)}}>{taskPointsPer}%</span>
                                      <span className={styles.table__points}>{grade?.taskPoints} / {grade?.taskMaxPoints}</span>
                                  </td>
                                  <td>
                                      <span className={styles.table__percentage} style={{color: getColor(55)}}>55%</span>
                                      <span className={styles.table__points}>55 / 66</span>
                                  </td>
                              </tr>
                          )
                      })}
                  </table>
              ) }

          </Box>
        </ThemeProvider>
    );
  }
};

export default UserGrades;
