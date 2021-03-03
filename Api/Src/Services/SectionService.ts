import * as mongoose from 'mongoose';
import { Section } from "../Models/Section";
import SectionRepository from "../Repositories/SectionRepository";

export default class SectionService {
  private sectionRepository: SectionRepository;

  constructor(sectionRepository: SectionRepository){
    this.sectionRepository = sectionRepository;
  }

  getSections = async (): Promise<(Section & mongoose.Document<Section>)[]> => {
    return this.sectionRepository.getAll();
  };

  getSectionById = async (courseId: mongoose.Types.ObjectId) => {
    return this.sectionRepository.getById(courseId);
  };

  createSection = async (course: Section & mongoose.Document<Section>) => {
    return this.sectionRepository.create(course);
  };
  
  updateSection = async (id: mongoose.Types.ObjectId, course: Section & mongoose.Document<Section>) => {
    return this.sectionRepository.updateById(id, course);
  };

  deleteSection = async (courseId: mongoose.Types.ObjectId) => {
    return this.sectionRepository.deleteById(courseId);
  }
}
