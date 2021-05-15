import { Request, Response } from 'express'
import * as mongoose from 'mongoose'
import TestService from '../Services/TestService'
import { Test } from '../Models/Section'
import SectionService from '../Services/SectionService'

export default class TestController {
  testService: TestService
  sectionService: SectionService
  constructor(testService: TestService, sectionService: SectionService) {
    this.testService = testService
    this.sectionService = sectionService
  }

  addTest = async (req: Request, res: Response) => {
    const sectionId = new mongoose.Types.ObjectId(req.params.id)
    const test = req.body
    const section = await this.testService.addTest(sectionId, test)
    if (!section) return res.status(404).json({ message: 'Section not found' })
    res.status(200).json({ message: 'Test added to section' })
  }

  updateTest = async (req: Request, res: Response) => {
    const sectionId = new mongoose.Types.ObjectId(req.params.sectionId)
    const testId = new mongoose.Types.ObjectId(req.params.testId)
    const testChanges = req.body
    const section = await this.sectionService.getSectionById(sectionId)
    if (!section) {
      return res.status(404).json({ message: 'Section not found' })
    }
    if (!section.tests.find((test) => testId.equals(test._id))) {
      return res.status(404).json({ message: 'Test not found' })
    }
    await this.testService.updateTest(sectionId, testId, testChanges)
    res.status(200).json({ message: 'Test was updated' })
  }

  deleteTest = async (req: Request, res: Response) => {
    const sectionId = new mongoose.Types.ObjectId(req.params.sectionId)
    const testId = new mongoose.Types.ObjectId(req.params.testId)
    const section = await this.sectionService.getSectionById(sectionId)
    if (!section) {
      return res.status(404).json({ message: 'Section not found' })
    }
    if (!section.tests.find((test) => testId.equals(test._id))) {
      return res.status(404).json({ message: 'Test not found' })
    }
    await this.testService.deleteTest(sectionId, testId)
    res.status(200).json({ message: 'Test was deleted' })
  }
}
