import api from './api.service'
import { CourseForSection, CourseDataForSection } from '../models/Course.model'
import {
  ManageSection,
  ManageSectionData,
  NewSectionData,
  Section,
  SectionData,
} from '../models/Section.model'
import {
  ProjectForSection,
  ProjectDataForSection,
} from '../models/Project.model'
import { AxiosResponse } from 'axios'

export const getSections = async (): Promise<ManageSection[]> => {
  const coursesResponse = await api.get('/courses')
  const courses = coursesResponse.data as CourseDataForSection[]
  const sections = (await api.get('/sections')).data as ManageSectionData[]
  return sections.map((section) => {
    const course = courses.find((course) => course._id === section.course)
    return {
      id: section._id,
      name: section.name,
      startDate: section.startDate
        ? new Date(section.startDate).getTime() / 1000
        : undefined,
      endDate: section.endDate
        ? new Date(section.endDate).getTime() / 1000
        : undefined,
      courseName: course ? course.name : '',
      courseId: course?._id || '',
    }
  })
}

export const getSectionsByCourseId = async (
  id: string,
): Promise<ManageSection[]> => {
  const courseResponse = await api.get(`/courses/${id}`)
  const course = courseResponse.data as CourseDataForSection
  const sections = (await api.get(`/courses/${id}/sections`))
    .data as ManageSectionData[]
  return sections.map((section) => {
    return {
      id: section._id,
      name: section.name,
      startDate: section.startDate
        ? new Date(section.startDate).getTime() / 1000
        : undefined,
      endDate: section.endDate
        ? new Date(section.endDate).getTime() / 1000
        : undefined,
      courseName: course ? course.name : '',
      courseId: course?._id || '',
    }
  })
}

export const getCourses = async (): Promise<CourseForSection[]> => {
  const courses = (await api.get('/courses')).data as CourseDataForSection[]
  return courses.map((course) => {
    return {
      id: course._id,
      courseName: course.name,
    }
  })
}

export const getProjectForSection = async (
  id: string,
): Promise<ProjectForSection> => {
  const projects = (await api.get('/projects')).data as ProjectDataForSection[]
  const project = projects.find(
    (project) => project.sectionId && project.sectionId === id,
  )
  return {
    id: project?._id || '',
    projectName: project?.projectName || '',
  }
}

export const getSection = async (id: string): Promise<Section | null> => {
  let sectionRes: AxiosResponse<SectionData>
  let section: SectionData
  try {
    sectionRes = await api.get(`/sections/${id}`)
    section = sectionRes.data
  } catch (err) {
    return null
  }
  return {
    id: section._id,
    name: section.name,
  }
}

export const getOneSection = async (id: string): Promise<ManageSection> => {
  const section = (await api.get(`/sections/${id}`)).data as ManageSectionData
  let course = null
  if (section.course) {
    try {
      const coursesResponse = await api.get(`/courses/${section.course}`)
      course = coursesResponse.data as CourseDataForSection
    } catch (e) {}
  }
  return {
    id: section._id,
    name: section.name,
    startDate: section.startDate
      ? new Date(section.startDate).getTime() / 1000
      : undefined,
    endDate: section.endDate
      ? new Date(section.endDate).getTime() / 1000
      : undefined,
    description: section.description,
    courseName: course ? course.name : '',
    courseId: course?._id || '',
  }
}

export const patchSection = async (id: string, data: NewSectionData) => {
  await api.put(`/sections/${id}`, data)
}

export const addSection = async (data: NewSectionData) => {
  await api.post(`/sections`, data)
}

export const deleteSection = async (id: string) => {
  await api.delete(`/sections/${id}`)
}

export const displayFormattedDate = (date: number) => {
  if (!date) return ''
  const dateObject = new Date(date * 1000)

  return `${dateObject.toLocaleDateString()}`
}
