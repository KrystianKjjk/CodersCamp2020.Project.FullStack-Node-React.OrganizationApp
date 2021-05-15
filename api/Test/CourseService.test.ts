import { Course } from '../Src/Models/Course'
import CourseSchema from '../Src/Models/Course'
import CourseRepository from '../Src/Repositories/CourseRepository'
import * as mongoose from 'mongoose'
import CourseService from '../Src/Services/CourseService'

class TestCourseRepository extends CourseRepository {
  private courses: (Course & mongoose.Document)[] = []

  constructor() {
    super(CourseSchema)
  }

  async getAll() {
    return this.courses
  }

  async getById(id: mongoose.Types.ObjectId) {
    return this.courses.find((course) => course._id === id)
  }

  async create(course: Course & mongoose.Document<Course>) {
    this.courses.push(course)
  }

  async deleteById(id: mongoose.Types.ObjectId) {
    const courseIndex = this.courses.findIndex((course) => course._id === id)
    if (courseIndex > -1) {
      this.courses.splice(courseIndex, 1)
    }
  }

  async updateById(
    id: mongoose.Types.ObjectId,
    course: Course & mongoose.Document<Course>,
  ) {
    const courseIndex = this.courses.findIndex((course) => course._id === id)
    this.courses[courseIndex] = course
    return course
  }
}

describe('CourseService', () => {
  let service: CourseService

  beforeEach(() => {
    service = new CourseService(new TestCourseRepository())
  })

  test('should create course and fetch it', async () => {
    const course = new CourseSchema({
      name: 'CodersCamp 2021',
      sections: [],
      description: 'description',
    })

    await service.createCourse(course)
    const fetchedCourse = await service.getCourseById(course._id)
    expect(fetchedCourse).toEqual(course)
  })

  test('should fetch all courses', async () => {
    const course = new CourseSchema({
      name: 'CodersCamp 2021',
      sections: [],
      description: 'description',
    })
    const course2 = new CourseSchema({
      name: 'CodersCamp 2022',
      sections: [],
      description: 'description',
    })

    await service.createCourse(course)
    await service.createCourse(course2)

    const fetchedCourses = await service.getCourses()
    expect(fetchedCourses.length).toBe(2)
  })

  test('should delete course', async () => {
    const course = new CourseSchema({
      name: 'CodersCamp 2021',
      sections: [],
      description: 'description',
    })

    await service.createCourse(course)
    await service.deleteCourse(course._id)

    const fetchedCourses = await service.getCourses()
    expect(fetchedCourses.length).toBe(0)
  })
  test('should update course', async () => {
    const course = new CourseSchema({
      name: 'CodersCamp 2021',
      sections: [],
      description: 'description',
    })

    await service.createCourse(course)
    course.name = 'updated name'
    const updatedCourse = await service.updateCourse(course._id, course)

    expect(updatedCourse.name).toBe(course.name)
  })
})
