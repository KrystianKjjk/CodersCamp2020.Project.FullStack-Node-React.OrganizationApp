import BaseService from "../app/baseService";

import {
  Course,
  CourseCreateObject,
} from "../components/Course/CourseDetailsSlice";
const axios = require("axios");

export interface CourseListElementDto {
  _id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export default class CoursesService {
  endpoint: string = "";

  constructor(private httpService: BaseService) {
    this.endpoint = `courses`;
  }

  async getCourse(id: string) {
    const endpoint = `${this.endpoint}/${id}`;
    return this.httpService.get(endpoint);
  }

  createCourse = (course: CourseCreateObject) => {
    // return axios.post('localhost:5000/api/courses', {course}, config);
   
    return this.httpService.post(`${this.endpoint}`, course);
    // `${this.endpoint}/`, course
  };
}

//   export const updateCourse = (course: Course) => {
//     // return axios.post('localhost:5000/api/courses', {course}, config);
//     return axios.put(
//       "https://coders-camp-organization-app.herokuapp.com/api/courses/"+course._id,
//       course,
//       config
//     );
//   };

//   export const fetchCourse = (courseId: string) => {
//     return axios.get(
//       "https://coders-camp-organization-app.herokuapp.com/api/courses/" +
//         courseId,
//       config
//     );
//   };

//   export const fetchCourses = () => {
//     return axios.get(
//       "https://coders-camp-organization-app.herokuapp.com/api/courses/",
//       config
//     );
//   };

//   export const deleteCourse = (courseId: string) => {
//     return axios.delete(
//       "https://coders-camp-organization-app.herokuapp.com/api/courses/" +
//         courseId,
//       config
//     );
//   };

//   export const fetchCourseSections = (courseId: string) => {
//     return axios.get(
//       `https://coders-camp-organization-app.herokuapp.com/api/courses/${courseId}/sections`,
//       config
//     );
//   };

//   export const deleteSectionById = (sectionId:string)=>{
//     return axios.delete(
//       "https://coders-camp-organization-app.herokuapp.com/api/sections/"+sectionId,
//       config
//     );
//   };
