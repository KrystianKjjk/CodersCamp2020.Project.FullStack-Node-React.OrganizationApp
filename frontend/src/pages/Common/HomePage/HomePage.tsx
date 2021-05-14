import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PageHeader from '../../../components/PageHeader'

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    setCourse(JSON.parse(localStorage.getItem('activeCourse')!))
  }, [])

  return (
    <div className={styles.container}>
      <PageHeader name="Homepage" />
      <div className={styles.description}>
        <div>
          <NotificationsIcon
            fontSize="large"
            style={{ paddingRight: '20px' }}
          ></NotificationsIcon>
          <h2> Next event</h2>
        </div>
        <div>
          {course ? (
            <div style={{ display: 'block', textAlign: 'center' }}>
              <h1>{course?.name}</h1>
              <h3 style={{ marginTop: '2rem' }}>
                Start date: {new Date(course?.startDate).toLocaleDateString()}
              </h3>
              <p style={{ marginTop: '2rem' }}>{course?.description}</p>
            </div>
          ) : (
            <h2>Information soon!</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
