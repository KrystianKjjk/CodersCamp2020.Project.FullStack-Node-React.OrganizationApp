import { CourseListElementModel } from '../pages/Admin/CourseList/CourseListSlice'

export const getUserFromLocalStorage = () => {
  const userId = localStorage.getItem('id')
  const userToken = localStorage.getItem('token')
  const userType = localStorage.getItem('type')

  return { userId, userToken, userType }
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('id')
  localStorage.removeItem('token')
  localStorage.removeItem('type')
}

export function setActiveCourse(course: CourseListElementModel) {
  localStorage.setItem('activeCourse', JSON.stringify(course))
}

export function getActiveCourse(): CourseListElementModel | undefined {
  const activeCourseItem = localStorage.getItem('activeCourse')
  if (!activeCourseItem) {
    return undefined
  }
  return JSON.parse(activeCourseItem)
}
