import React from 'react'
import styles from './CourseList.module.css'
import { useAppSelector } from '../../../hooks/hooks'
import CourseListElement from './CourseListElement'
import PageHeader from '../../../components/PageHeader'
import { useHistory } from 'react-router-dom'
import UButton from '../../../components/UButton'
import { useCourses } from '../../../hooks'
import { CircularProgress, LinearProgress } from '@material-ui/core'
import useSnackbar from '../../../hooks/useSnackbar'

export interface CourseListProps {}

const CourseList: React.FC<CourseListProps> = (props) => {
  const history = useHistory()
  const { activeCourse } = useAppSelector((state) => state.courseList)
  const { data: courseList, error, isLoading, isFetching } = useCourses()
  const { showError } = useSnackbar()

  const listElements = courseList?.map((courseListElement) => (
    <CourseListElement
      key={courseListElement._id}
      course={courseListElement}
      isActive={courseListElement._id === activeCourse?._id}
    />
  ))

  const handleAddButtonClick = (event: any) => {
    history.push('coursecreate/')
  }

  if (error) showError('Something went wrong :(')

  if (isLoading) return <CircularProgress />
  
  if (isFetching) return <LinearProgress />

  return (
    <div>
      <PageHeader name="Courses"></PageHeader>
      <div>
        <div className={styles.manageCourseBar}>
          <h3>Manage courses</h3>
          <UButton
            text="ADD"
            color="primary"
            onClick={handleAddButtonClick}
          ></UButton>
        </div>
        <div className={styles.listContainer}>{listElements}</div>
      </div>
    </div>
  )
}

export default CourseList
