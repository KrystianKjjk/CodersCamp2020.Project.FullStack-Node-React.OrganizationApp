import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import {fetchCourse, updateCourse} from './CourseClient';

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

export const updateCourseAsync = (course:Course):AppThunk=> dispatch=>{
return updateCourse(course);
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

export default courseSlice.reducer;
