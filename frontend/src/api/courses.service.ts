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
  private endpoint: string = "courses";
  private httpService = new BaseService();
  // constructor() {
  //   this.endpoint = `courses`;
  // }

  async getCourse(id: string) {
    const endpoint = `${this.endpoint}/${id}`;
    return this.httpService.get(endpoint);
  }

  async createCourse(course: CourseCreateObject) {
    return this.httpService.post(this.endpoint, course);
  }

  async fetchCourses() {
    return this.httpService.get(this.endpoint);
  }

  async fetchCourse(courseId:string){
    return this.httpService.get(`${this.endpoint}/${courseId}`);
  }

  async updateCourse(course: Course) {
    return this.httpService.put(`${this.endpoint}/${course._id}`, course);
  }

  async deleteCourse(courseId:string){
  return this.httpService.delete(`${this.endpoint}/${courseId}`); 
  }

  async fetchCourseSections(courseId:string){
  return this.httpService.get(`${this.endpoint}/${courseId}/sections`);
  }

}

// export const fetchCourseSections = (courseId: string) => {
  //     return axios.get(
  //       `https://coders-camp-organization-app.herokuapp.com/api/courses/${courseId}/sections`,
  //       config
  //     );
  //   };

//OK export const deleteCourse = (courseId: string) => {
  //     return axios.delete(
  //       "https://coders-camp-organization-app.herokuapp.com/api/courses/" +
  //         courseId,
  //       config
  //     );
  //   };

//OK   export const updateCourse = (course: Course) => {
//     // return axios.post('localhost:5000/api/courses', {course}, config);
//     return axios.put(
//       "https://coders-camp-organization-app.herokuapp.com/api/courses/"+course._id,
//       course,
//       config
//     );
//   };

//OK   export const fetchCourse = (courseId: string) => {
//     return axios.get(
//       "https://coders-camp-organization-app.herokuapp.com/api/courses/" +
//         courseId,
//       config
//     );
//   };

//OK   export const fetchCourses = () => {
//     return axios.get(
//       "https://coders-camp-organization-app.herokuapp.com/api/courses/",
//       config
//     );
//   };

//  

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
