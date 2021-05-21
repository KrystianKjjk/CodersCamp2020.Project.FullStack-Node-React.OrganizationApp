import { CourseListElementModel } from '../pages/Admin/CourseList/CourseListSlice'

export const getUserFromLocalStorage = () => {
  const userId = localStorage.getItem('id')
  const userType = localStorage.getItem('type')

  return { userId, userType }
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('id')
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
