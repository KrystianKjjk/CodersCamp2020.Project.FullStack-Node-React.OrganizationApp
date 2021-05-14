import * as express from 'express'
import CourseService from '../Services/CourseService'
import * as mongoose from 'mongoose'
import CourseSchema from '../Models/Course'

export default class CourseController {
  private service: CourseService

  constructor(service: CourseService) {
    this.service = service
  }

  getCourses = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    const courses = await this.service.getCourses()
    return res.status(200).json(courses)
  }

  getCourseById = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const courseId = new mongoose.Types.ObjectId(req.params.id)
      const course = await this.service.getCourseById(courseId)
      if (!course) return res.status(404).json({ message: 'Course not found' })
      return res.status(200).json(course)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createCourse = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const course = new CourseSchema(req.body)
      await course.validate()
      await this.service.createCourse(course)
      return res.status(201).json(course)
    } catch (error) {
      const errorMessage = { message: error.message }
      if (error.name === 'ValidationError') {
        return res.status(400).json(errorMessage)
      }
      return res.status(500).json(errorMessage)
    }
  }

  updateCourse = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const courseId = new mongoose.Types.ObjectId(req.params.id)
      const course = new CourseSchema(req.body)
      course._id = courseId
      await course.validate()
      const updatedCourse = await this.service.updateCourse(courseId, course)
      if (!updatedCourse)
        return res.status(404).json({ message: 'Course not found' })
      const fetchedCourse = await this.service.getCourseById(courseId)
      return res.status(201).json(fetchedCourse)
    } catch (error) {
      const errorMessage = { message: error.message }
      if (error.name === 'ValidationError') {
        return res.status(400).json(errorMessage)
      }
      return res.status(500).json(errorMessage)
    }
  }

  deleteCourse = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const courseId = new mongoose.Types.ObjectId(req.params.id)
      const course = this.service.deleteCourse(courseId)
      if (!course) return res.status(404).json({ message: 'Course not found' })
      return res.status(200).end()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
