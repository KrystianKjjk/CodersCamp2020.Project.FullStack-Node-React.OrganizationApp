import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk} from "../../app/store";
import { CourseCreateObject } from "../Course/CourseDetailsSlice";
import CoursesService, { CourseListElementDto } from "../../api/courses.service";
import * as ActiveCourse  from '../../app/ActiveCourse';


export interface CourseListElementModel extends CourseCreateObject {
  _id: string;
}

interface CourseListState {
  courseList: CourseListElementModel[];
  activeCourse?: CourseListElementModel;
}

const initialState: CourseListState = {
  courseList: [],
  activeCourse: ActiveCourse.getActiveCourse()
};

export const fetchCoursesAsync = (): AppThunk => async (dispatch) => {
  const courses = await fetchCoursesAndSort();
  dispatch(setCourses(courses));
};

export const fetchCoursesAndSort = async () => {
  const courseService = new CoursesService();
  const response = await courseService.fetchCourses();
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
    const courseListElementStartDate1 = courseListElement1.startDate.getTime();
    const courseListElementStartDate2 = courseListElement2.startDate.getTime();
    return courseListElementStartDate2 - courseListElementStartDate1;
  });
  return courses;
};

export const deleteCourseAsync = (courseId: string): AppThunk => async (
  dispatch
) => {
  const courseService = new CoursesService();
  courseService.deleteCourse(courseId).then(() => dispatch(removeCourse(courseId)));
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
      if(idToDelete===state.activeCourse?._id){
        const course=state.courseList[0];
        state.activeCourse=course;
        ActiveCourse.setActiveCourse(course);
      }
    },
    setActiveCourse: (state, action: PayloadAction<CourseListElementModel>) => {
      const course = action.payload;
      ActiveCourse.setActiveCourse(course);
      state.activeCourse = course;
    }
  },
});

export const { setCourses, removeCourse, setActiveCourse } = courseListSlice.actions;

export default courseListSlice.reducer;
