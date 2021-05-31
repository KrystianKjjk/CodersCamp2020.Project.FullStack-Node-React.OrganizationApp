import React from 'react'
import styles from './UserGrades.module.css'
import { Box, CircularProgress } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { mainTheme } from '../../../theme/customMaterialTheme'
import {
  MAX_PROJECT,
  PROJECT_WEIGHT,
  QUIZ_WEIGHT,
  TASK_WEIGHT,
} from '../../../app/constants'
import PageHeader from '../../../components/PageHeader'
import { useUserMe } from '../../../hooks'

export interface UserGradesProps {}

const UserGrades: React.FC<UserGradesProps> = (props) => {
  const userID = localStorage.getItem('id') ?? ''
  const { data: userData, isLoading, error } = useUserMe({
    enabled: !!userID,
  })

  let finalResult = 0

  function getColor(percentage: number) {
    if (percentage > 80) return '#3E66FB'
    else if (percentage > 50) return '#3CC13B'
    else if (percentage > 30) return '#FCE205'
    else return '#FF384A'
  }

  if (error) {
    return <div className={styles.error}>Error</div>
  } else if (isLoading) {
    return <CircularProgress className={styles.loading} />
  } else {
    return (
      <ThemeProvider theme={mainTheme}>
        <PageHeader name="My Grades" />

        <Box className={styles.container}>
          <Box display="flex" className={styles.container__header}>
            <span>My Grades</span>
          </Box>
          {!userData?.grades.length ? (
            <h1 style={{ margin: '3rem', fontWeight: 500 }}>No grades yet.</h1>
          ) : (
            <>
              <table
                style={{ width: '100%' }}
                className={styles.container__body}
              >
                <tr>
                  <th></th>
                  <th>Test</th>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Average</th>
                </tr>

                {userData?.grades.map((grade: any) => {
                  const testPointsPer = grade?.testMaxPoints
                    ? ((grade?.testPoints || 0) / grade.testMaxPoints) * 100
                    : 0

                  const taskPointsPer = grade?.taskMaxPoints
                    ? ((grade?.taskPoints || 0) / grade.taskMaxPoints) * 100
                    : 0
                  const projectPointsPer =
                    ((grade?.projectPoints || 0) / MAX_PROJECT) * 100

                  let weight = QUIZ_WEIGHT
                  let average = QUIZ_WEIGHT * testPointsPer
                  if (grade?.taskMaxPoints) {
                    average += TASK_WEIGHT * taskPointsPer
                    weight += TASK_WEIGHT
                  }
                  if (grade?.projectPoints) {
                    average += PROJECT_WEIGHT * projectPointsPer
                    weight += PROJECT_WEIGHT
                  }

                  average /= weight
                  finalResult += average

                  return (
                    <tr>
                      <th>{grade['Section name']}</th>
                      <td>
                        <span
                          className={styles.table__percentage}
                          style={{ color: getColor(testPointsPer) }}
                        >
                          {testPointsPer.toFixed(2)}%
                        </span>
                        <span className={styles.table__points}>
                          {grade?.testPoints} / {grade?.testMaxPoints}
                        </span>
                      </td>
                      <td>
                        {grade?.taskMaxPoints ? (
                          <>
                            <span
                              className={styles.table__percentage}
                              style={{ color: getColor(taskPointsPer) }}
                            >
                              {taskPointsPer.toFixed(2)}%
                            </span>
                            <span className={styles.table__points}>
                              {grade?.taskPoints} / {grade?.taskMaxPoints}
                            </span>
                          </>
                        ) : (
                          <span> - </span>
                        )}
                      </td>
                      <td>
                        {grade?.projectPoints ? (
                          <>
                            <span
                              className={styles.table__percentage}
                              style={{ color: getColor(projectPointsPer) }}
                            >
                              {projectPointsPer.toFixed(2)}%
                            </span>
                            <span className={styles.table__points}>
                              {grade?.projectPoints} / {MAX_PROJECT}
                            </span>
                          </>
                        ) : (
                          <span> - </span>
                        )}
                      </td>
                      <td>
                        <span
                          className={styles.table__percentage}
                          style={{ color: getColor(average) }}
                        >
                          {average.toFixed(2)} %
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </table>

              <h2>Your current overall result</h2>

              <div
                style={{
                  height: '1rem',
                  width: '400px',
                  background: 'rgba(255,255,255,.90)',
                  borderRadius: '1rem',
                  margin: '1rem auto 1rem auto',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: '1rem',
                    width: `${
                      (400 * (finalResult / userData?.grades?.length)) / 100
                    }px`,
                    background: getColor(
                      finalResult / userData?.grades?.length,
                    ),
                    borderRadius: '1rem',
                  }}
                />
                <div
                  style={{
                    width: '5px',
                    height: '1rem',
                    background: '#000',
                    position: 'absolute',
                    top: '0',
                    left: '320px',
                  }}
                />
              </div>
              <h3 style={{ marginBottom: '3rem' }}>
                {(finalResult / userData?.grades?.length).toFixed(2)}%
              </h3>
            </>
          )}
        </Box>
      </ThemeProvider>
    )
  }
}

export default UserGrades
