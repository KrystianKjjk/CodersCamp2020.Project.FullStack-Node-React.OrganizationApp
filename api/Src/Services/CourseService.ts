import * as mongoose from 'mongoose'
import { Course } from '../Models/Course'
import CourseRepository from '../Repositories/CourseRepository'

export default class CourseService {
  private courseRepository: CourseRepository

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository
  }

  getCourses = async (): Promise<(Course & mongoose.Document<Course>)[]> => {
    return this.courseRepository.getAll()
  }

  getCourseById = async (courseId: mongoose.Types.ObjectId) => {
    return this.courseRepository.getById(courseId)
  }

  createCourse = async (course: Course & mongoose.Document<Course>) => {
    return this.courseRepository.create(course)
  }

  updateCourse = async (
    id: mongoose.Types.ObjectId,
    course: Course & mongoose.Document<Course>,
  ) => {
    return this.courseRepository.updateById(id, course)
  }

  deleteCourse = async (courseId: mongoose.Types.ObjectId) => {
    return this.courseRepository.deleteById(courseId)
  }
}
