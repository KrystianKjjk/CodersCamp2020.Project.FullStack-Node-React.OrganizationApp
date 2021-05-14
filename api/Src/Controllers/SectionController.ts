import * as express from 'express'
import * as mongoose from 'mongoose'
import SectionSchema from '../Models/Section'
import SectionService from '../Services/SectionService'

export default class SectionController {
  service: SectionService
  constructor(service: SectionService) {
    this.service = service
  }

  getSections = async (req: express.Request, res: express.Response) => {
    const allSections = await this.service.getSections()
    return res.status(200).json(allSections)
  }

  getSectionsByCourseId = async (
    req: express.Request,
    res: express.Response,
  ) => {
    const courseId = new mongoose.Types.ObjectId(req.params.id)
    const allSections = await this.service.getSectionsByCourseId(courseId)
    return res.status(200).json(allSections)
  }

  getSectionById = async (req: express.Request, res: express.Response) => {
    try {
      const sectionId = new mongoose.Types.ObjectId(req.params.id)
      const section = await this.service.getSectionById(sectionId)
      if (!section) {
        return res.status(404).json({ message: 'Section not found' })
      }
      return res.status(200).json(section)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createSection = async (req: express.Request, res: express.Response) => {
    try {
      const section = new SectionSchema(req.body)
      await section.validate()
      await this.service.createSection(section)
      return res.status(201).json(section)
    } catch (error) {
      const errorMessage = { message: error.message }
      if (error.name === 'ValidationError') {
        return res.status(400).json(errorMessage)
      }
      return res.status(500).json(errorMessage)
    }
  }

  updateSection = async (req: express.Request, res: express.Response) => {
    try {
      const sectionId = new mongoose.Types.ObjectId(req.params.id)
      const section = new SectionSchema(req.body)
      section._id = sectionId
      await section.validate()
      const updatedSection = await this.service.updateSection(
        sectionId,
        section,
      )
      if (!updatedSection) {
        return res.status(404).json({ message: 'Section not found' })
      }
      const fetchedSection = await this.service.getSectionById(sectionId)
      return res.status(201).json(fetchedSection)
    } catch (error) {
      const errorMessage = { message: error.message }
      if (error.name === 'ValidationError') {
        return res.status(400).json(errorMessage)
      }
      return res.status(500).json(errorMessage)
    }
  }

  deleteSection = async (req: express.Request, res: express.Response) => {
    try {
      const sectionId = new mongoose.Types.ObjectId(req.params.id)
      const section = this.service.deleteSection(sectionId)
      if (!section) {
        return res.status(404).json({ message: 'Section not found' })
      }
      return res.status(200).end()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
