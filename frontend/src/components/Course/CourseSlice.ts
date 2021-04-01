import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import {fetchCourse} from './CourseClient';

export interface Course extends CourseCreateObject {
  _id: string;
  sections:any[];
}

export interface CourseCreateObject {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

interface CourseState {
  course?:Course;
}

const initialState: CourseState = {};

export const fetchCourseAsync = (courseId: string): AppThunk => async dispatch => {
  const response = await fetchCourse(courseId);
  const course : Course = response.data;
  dispatch(setCourse(course)); 
}

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
    }
  },
});

export const {setCourse} = courseSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectCourse = (state: RootState) => state.course.value;

export default courseSlice.reducer;
