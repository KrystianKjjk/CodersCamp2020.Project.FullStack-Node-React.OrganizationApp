import * as api from '../../api/Course.api'
import { useGenericQuery } from './useGenericQuery'
import * as sectionsApi from '../../api/Section.api'
import {
  Course,
  CourseDto,
  SectionListElement,
} from '../../models/Course.model'

const fetchCourseAsync = async (courseId: string): Promise<Course> => {
  const courseResponse = await api.getCourse(courseId)
  const courseDto: CourseDto = courseResponse.data
  const sectionsResponse = await api.fetchCourseSections(courseId)
  const sections: SectionListElement[] = sectionsResponse.data
  return {
    ...courseDto,
    sections: sections,
  }
}

const useCourse = (courseId: string) =>
  useGenericQuery(['course', courseId], () => fetchCourseAsync(courseId))
export default useCourse

export const updateCourseAsync = async (
  course: Course,
  sectionsIdToDelete: string[],
): Promise<void> => {
  sectionsIdToDelete.forEach(async (sectionId) => {
    await sectionsApi.deleteSection(sectionId)
  })
  await api.updateCourse(course)
}
