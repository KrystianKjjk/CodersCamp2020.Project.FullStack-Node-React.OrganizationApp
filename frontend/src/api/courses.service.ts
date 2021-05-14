import BaseService from '../app/baseService'

import {
  Course,
  CourseCreateObject,
} from '../pages/Admin/Course/CourseDetailsSlice'

export interface CourseListElementDto {
  _id: string
  name: string
  description?: string
  startDate: string
  endDate: string
}

export default class CoursesService {
  private endpoint: string = 'courses'
  private httpService = new BaseService()

  async getCourse(id: string) {
    const endpoint = `${this.endpoint}/${id}`
    return this.httpService.get(endpoint)
  }

  async createCourse(course: CourseCreateObject) {
    return this.httpService.post(this.endpoint, course)
  }

  async fetchCourses() {
    return this.httpService.get(this.endpoint)
  }

  async updateCourse(course: Course) {
    return this.httpService.put(`${this.endpoint}/${course._id}`, course)
  }

  async deleteCourse(courseId: string) {
    return this.httpService.delete(`${this.endpoint}/${courseId}`)
  }

  async fetchCourseSections(courseId: string) {
    return this.httpService.get(`${this.endpoint}/${courseId}/sections`)
  }
}
