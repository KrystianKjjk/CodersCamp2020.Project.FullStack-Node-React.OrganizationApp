import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { CourseCreateObject } from "../Course/CourseSlice";
import {
  CourseListElementDto,
  deleteCourse,
  fetchCourses,
} from "../Course/CourseClient";
import CourseList from "./CourseList";
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
  const response = await fetchCourses();
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
  dispatch(setCourses(courses));
};

export const deleteCourseAsync = (courseId: string): AppThunk => async (dispatch) => {
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

//jak ktos wejdzie na courseList.tsx to zrobic useEffect zeby za pierwszym razem byla dispatchowana akcja pobierz wszystkie kursy
//pobranie listy w course client
