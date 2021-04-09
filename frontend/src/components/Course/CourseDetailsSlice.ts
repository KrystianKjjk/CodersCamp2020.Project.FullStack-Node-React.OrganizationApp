import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { fetchCourse, updateCourse, fetchCourseSections } from "./CourseClient";

export interface Course extends CourseCreateObject {
  _id: string;
  sections: SectionListElement[];
}

export interface CourseCreateObject {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

interface CourseDto {
  _id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export interface SectionListElement {
  _id: string;
  name: string;
}

interface CourseState {
  course?: Course;
}

const initialState: CourseState = {};

export const fetchCourseAsync = (courseId: string): AppThunk => async (
  dispatch
) => {
  const courseResponse = await fetchCourse(courseId);
  const courseDto: CourseDto = courseResponse.data;

  const sectionsResponse = await fetchCourseSections(courseId);
  const sections: SectionListElement[] = sectionsResponse.data;
  const course: Course = {
    ...courseDto,
    startDate: new Date(Date.parse(courseDto.startDate)),
    endDate: new Date(Date.parse(courseDto.endDate)),
    sections: sections
  };
  dispatch(setCourse(course));
};

export const updateCourseAsync = (course: Course): AppThunk => (dispatch) => {
  return updateCourse(course);
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      const sectionId = action.payload;
      if(!state.course){
        return;
      }
      state.course.sections = state.course.sections.filter(section => section._id !== sectionId);
    }
  },
});

export const { setCourse, deleteSection } = courseSlice.actions;

export default courseSlice.reducer;
