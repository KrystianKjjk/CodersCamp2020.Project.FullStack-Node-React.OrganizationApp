import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { CourseCreateObject } from "../Course/CourseDetailsSlice";
import {
  CourseListElementDto,
  deleteCourse,
  fetchCourses,
} from "../Course/CourseClient";
import CourseList from "./CourseList";
import {getActiveCourse, setActiveCourse} from "../../app/ActiveCourse";
import CoursesService from "../../api/courses.service";
// import CourseCreateObject from '../CourseCreate';

export interface CourseListElementModel extends CourseCreateObject {
  _id: string;
}

interface CourseListState {
  courseList: CourseListElementModel[];
}

const initialState: CourseListState = {
  courseList: [],
};

export const fetchCoursesAsync = (): AppThunk => async (dispatch) => {
  const courses=await fetchCoursesAndSort();
  dispatch(setCourses(courses));
};

export const fetchCoursesAndSort=async ()=>{
  const courseService = new CoursesService();
  const response = await courseService.fetchCourses();
  // const response = await fetchCourses();
  const coursesDto: CourseListElementDto[] = response.data;
  const courses: CourseListElementModel[] = coursesDto.map((courseDto) => {
    const courseListElement: CourseListElementModel = {
      _id: courseDto._id,
      name: courseDto.name,
      description: courseDto.description,
      endDate: new Date(Date.parse(courseDto.endDate)),
      startDate: new Date(Date.parse(courseDto.startDate)),
    };
    return courseListElement;
  });
  courses.sort(function (courseListElement1, courseListElement2) {
    var courseListElementStartDate1 = courseListElement1.startDate.getTime();
    var courseListElementStartDate2 = courseListElement2.startDate.getTime();
    return courseListElementStartDate2 - courseListElementStartDate1;
  });
  return courses;
}

export const deleteCourseAsync = (courseId: string): AppThunk => async (
  dispatch
) => {
  deleteCourse(courseId).then(() => dispatch(removeCourse(courseId)));
};

export const courseListSlice = createSlice({
  name: "courseList",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseListElementModel[]>) => {
      state.courseList = action.payload;
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      state.courseList = state.courseList.filter(
        (courseListElement) => courseListElement._id !== idToDelete
      );
    },
  },
});

export const { setCourses, removeCourse } = courseListSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectCourseList = (state: RootState) => state.courseList.value;

export default courseListSlice.reducer;

