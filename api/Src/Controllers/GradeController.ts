import * as express from 'express'

import GradeService from '../Services/GradeService'

export default class GradeController {
  constructor(private service: GradeService) {}

  createGrade = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const grade = await this.service.createGrade(req)
      return res.status(201).json(grade)
    } catch (err) {
      const msg = { message: err.message }
      return err.name === 'ValidationError'
        ? res.status(400).json(msg)
        : res.status(500).json(msg)
    }
  }

  getGrades = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const grades = await this.service.findGrades(req)
      return grades
        ? res.status(200).json(grades)
        : res.status(404).json({ message: 'Grade not found' })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }

  updateGrade = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const result = await this.service.updateGrade(req)
      return result.nModified
        ? res.status(201).json(result)
        : res.status(404).json({ message: 'Grade not found' })
    } catch (err) {
      const msg = { message: err.message }
      return err.name === 'ValidationError'
        ? res.status(400).json(msg)
        : res.status(500).json(msg)
    }
  }

  deleteGrade = async (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    try {
      const grade = await this.service.deleteGrade(req)
      return grade
        ? res.status(200).json(grade)
        : res.status(404).json({ message: 'Grade not found' })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
