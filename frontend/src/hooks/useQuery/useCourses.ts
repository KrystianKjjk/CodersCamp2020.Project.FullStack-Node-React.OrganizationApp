import * as api from '../../api/Course.api'
import { CourseListElementModel } from '../../pages/Admin/CourseList/CourseListSlice'
import { useQuery } from 'react-query'

export const fetchCoursesAndSort = async () => {
  const response = await api.fetchCourses()
  const courses: CourseListElementModel[] = response.data
  courses.sort(function (courseListElement1, courseListElement2) {
    const courseListElementStartDate1 = new Date(
      courseListElement1.startDate,
    ).getTime()
    const courseListElementStartDate2 = new Date(
      courseListElement2.startDate,
    ).getTime()
    return courseListElementStartDate2 - courseListElementStartDate1
  })

  return courses
}

const useCourses = () => useQuery('courses', fetchCoursesAndSort)
export default useCourses
