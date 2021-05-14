import * as mongoose from 'mongoose'
import SectionRepository from '../Src/Repositories/SectionRepository'
import SectionService from '../Src/Services/SectionService'
import SectionSchema from '../Src/Models/Section'
import { Section } from '../Src/Models/Section'

type SectionDBModel = Section & { _id: mongoose.Types.ObjectId }

class TestSectionRepository extends SectionRepository {
  private sections: Array<SectionDBModel> = []
  model: any

  async getAll() {
    return this.sections
  }

  async getById(id: mongoose.Types.ObjectId) {
    return this.sections.find((section) => section._id === id)
  }

  async create(section: SectionDBModel) {
    this.sections = [...this.sections, section]
  }

  async deleteById(id: mongoose.Types.ObjectId) {
    this.sections = this.sections.filter((section) => section._id !== id)
  }

  async updateById(id: mongoose.Types.ObjectId, section: SectionDBModel) {
    const sectionIndex = this.sections.findIndex(
      (section) => section._id === id,
    )
    const sectionAfterUpdate = { ...this.sections[sectionIndex], ...section }
    this.sections[sectionIndex] = sectionAfterUpdate

    return sectionAfterUpdate
  }

  async updateByQuery(query: object, obj: object) {
    return // we don't need implementation for it
  }

  async getSectionsByCourseId(course: mongoose.Types.ObjectId) {
    const sections = this.sections.filter((section) =>
      course.equals(section.course),
    )
    return sections
  }
}

describe('Section Service', () => {
  let service: SectionService

  beforeEach(() => {
    service = new SectionService(new TestSectionRepository(SectionSchema))
  })

  test('should create section and fetch it', async () => {
    const section = new SectionSchema({
      name: 'CodersCamp 2021',
      sections: [],
      description: 'description',
    })

    await service.createSection(section)
    const fetchedSection = await service.getSectionById(section._id)
    expect(fetchedSection).toEqual(section)
  })

  test('should fetch all sections', async () => {
    const section = new SectionSchema({
      name: 'Typescript',
      startDate: Date.now(),
      endDate: Date.now(),
    })
    const section2 = new SectionSchema({
      name: 'Javascript',
      startDate: Date.now(),
      endDate: Date.now(),
    })

    await service.createSection(section)
    await service.createSection(section2)

    const fetchedSections = await service.getSections()
    expect(fetchedSections.length).toBe(2)
  })

  test('should fetch sections by course id', async () => {
    const courseId = mongoose.Types.ObjectId()
    const section1 = new SectionSchema({
      name: 'Typescript',
      startDate: Date.now(),
      endDate: Date.now(),
      course: courseId,
    })
    const section2 = new SectionSchema({
      name: 'Javascript',
      startDate: Date.now(),
      endDate: Date.now(),
      course: courseId,
    })

    await service.createSection(section1)
    await service.createSection(section2)

    const fetchedSections = await service.getSectionsByCourseId(section1.course)
    expect(fetchedSections.length).toBe(2)
  })

  test('should delete section', async () => {
    const section = new SectionSchema({
      name: 'Typescript',
      startDate: Date.now(),
      endDate: Date.now(),
    })

    await service.createSection(section)
    await service.deleteSection(section._id)

    const fetchedSections = await service.getSections()
    expect(fetchedSections.length).toBe(0)
  })
  test('should update section', async () => {
    const section = new SectionSchema({
      name: 'Typescript',
      startDate: Date.now(),
      endDate: Date.now(),
    })

    await service.createSection(section)
    section.name = 'updated name'
    const updatedSection = await service.updateSection(section._id, section)

    expect(updatedSection._doc.name).toEqual(section.name)
  })
})
