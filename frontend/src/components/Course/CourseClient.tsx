import { Course, CourseCreateObject } from "./CourseDetailsSlice";
const axios = require("axios");

export interface CourseListElementDto {
  _id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

let config = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTczMDQxNTcsImV4cCI6MTYxNzMwNTM1N30.sqm5n8ucZi-bT4P3bPdAHVakjN1zJEnlT054OAqWxME",
  },
};

export const createCourse = (course: CourseCreateObject) => {
  // return axios.post('localhost:5000/api/courses', {course}, config);
  return axios.post(
    "https://coders-camp-organization-app.herokuapp.com/api/courses",
    course,
    config
  );
};

export const updateCourse = (course: Course) => {
  // return axios.post('localhost:5000/api/courses', {course}, config);
  return axios.put(
    "https://coders-camp-organization-app.herokuapp.com/api/courses/"+course._id,
    course,
    config
  );
};

export const fetchCourse = (courseId: string) => {
  return axios.get(
    "https://coders-camp-organization-app.herokuapp.com/api/courses/" +
      courseId,
    config
  );
};

export const fetchCourses = () => {
  return axios.get(
    "https://coders-camp-organization-app.herokuapp.com/api/courses/",
    config
  );
};

export const deleteCourse = (courseId: string) => {
  return axios.delete(
    "https://coders-camp-organization-app.herokuapp.com/api/courses/" +
      courseId,
    config
  );
};


export const fetchCourseSections = (courseId: string) => {
  return axios.get(
    `https://coders-camp-organization-app.herokuapp.com/api/courses/${courseId}/sections`,
    config
  );
};