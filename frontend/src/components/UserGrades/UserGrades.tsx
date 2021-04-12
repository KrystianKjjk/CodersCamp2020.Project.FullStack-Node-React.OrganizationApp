import React, {useState} from 'react';
import styles from './UserGrades.module.css';
import {Box, Breadcrumbs, CircularProgress, Link, Snackbar, Typography} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {mainTheme} from "../../theme/customMaterialTheme";

export interface UserGradesProps {
}

const UserGrades: React.FC< UserGradesProps > = props => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);


  function getColor(percentage: number) {
      if( percentage > 90 ) return '#3E66FB';
      else if (percentage > 50) return '#3CC13B';
      else if (percentage > 30) return '#FCE205';
      else return '#FF384A';
  }

  if (error) {
    return <div className={styles.error}>Error</div>;
  } else if (!isLoaded) {
    return <CircularProgress className={styles.loading}/>
  } else {
    return (
        <ThemeProvider theme={mainTheme}>

          <Breadcrumbs aria-label="breadcrumb" color="primary" className={styles.breadcrumbs}>
            <Typography color="primary">MY GRADES</Typography>
          </Breadcrumbs>

          <Box className={styles.container}>
            <Box display="flex" className={styles.container__header}>
              <span>My Grades</span>
            </Box>

              <table style={{width: "100%"}} className={styles.container__body}>
                  <tr>
                      <th></th>
                      <th>Test</th>
                      <th>Task</th>
                      <th>Project</th>
                  </tr>
                  <tr>
                      <th>Section 1</th>
                      <td>
                          <span className={styles.table__percentage} style={{color: getColor(95)}}>95%</span>
                          <span className={styles.table__points}>55 / 66</span>
                      </td>
                      <td>
                          <span className={styles.table__percentage} style={{color: getColor(20)}}>20%</span>
                          <span className={styles.table__points}>55 / 66</span>
                      </td>
                      <td>
                          <span className={styles.table__percentage} style={{color: getColor(55)}}>55%</span>
                          <span className={styles.table__points}>55 / 66</span>
                      </td>
                  </tr>
                  <tr>
                      <th>Section 2</th>
                      <td>
                          <span className={styles.table__percentage} style={{color: getColor(95)}}>95%</span>
                          <span className={styles.table__points}>55 / 66</span>
                      </td>
                      <td>
                          <span className={styles.table__percentage} style={{color: getColor(20)}}>20%</span>
                          <span className={styles.table__points}>55 / 66</span>
                      </td>
                      <td>
                          <span className={styles.table__percentage} style={{color: getColor(55)}}>55%</span>
                          <span className={styles.table__points}>55 / 66</span>
                      </td>
                  </tr>
              </table>



          </Box>
        </ThemeProvider>
    );
  }
};

export default UserGrades;
