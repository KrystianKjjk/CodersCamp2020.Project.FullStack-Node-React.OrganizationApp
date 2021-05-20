import api from './api.service'

import {
  Course,
  CourseCreateObject,
} from '../models/Course.model'

export interface CourseListElementDto {
  _id: string
  name: string
  description?: string
  startDate: string
  endDate: string
}

const endpoint: string = 'courses'

export const getCourse = async (id: string) => {
  return api.get(`${endpoint}/${id}`)
}

export const createCourse = async (course: CourseCreateObject) => {
  return api.post(endpoint, course)
}

export const fetchCourses = async () => {
  return api.get(endpoint)
}

export const updateCourse = async (course: Course) => {
  return api.put(`${endpoint}/${course._id}`, course)
}

export const deleteCourse = async (courseId: string) => {
  return api.delete(`${endpoint}/${courseId}`)
}

export const fetchCourseSections = async (courseId: string) => {
  return api.get(`${endpoint}/${courseId}/sections`)
}
