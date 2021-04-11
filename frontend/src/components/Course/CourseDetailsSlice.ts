import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CoursesService from "../../api/courses.service";
import SectionsService from "../../api/sections.service";
import BaseService from "../../app/baseService";
import { AppThunk} from "../../app/store";


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
  sectionsIdToDelete:string[]
}

const initialState: CourseState = {sectionsIdToDelete:[]};

export const fetchCourseAsync = (courseId: string): AppThunk => async (
  dispatch
) => {
  const courseService = new CoursesService();
  const courseResponse = await courseService.getCourse(courseId);
  const courseDto: CourseDto = courseResponse.data;
  const sectionsResponse = await courseService.fetchCourseSections(courseId);
  const sections: SectionListElement[] = sectionsResponse.data;
  const course: Course = {
    ...courseDto,
    startDate: new Date(Date.parse(courseDto.startDate)),
    endDate: new Date(Date.parse(courseDto.endDate)),
    sections: sections
  };
  dispatch(setCourse(course));
};

export const updateCourseAsync =  (course: Course, sectionsIdToDelete:string[]): AppThunk<Promise<void>> =>async (dispatch) => {
  const courseService = new CoursesService();
  const sectionsService = new SectionsService(new BaseService());
 try{
  sectionsIdToDelete.forEach(async(sectionId)=>{
    await sectionsService.deleteSectionById(sectionId);
  })
  await courseService.updateCourse(course);
  dispatch(setCourse(course));
  return Promise.resolve();
 }
  catch(exception){
    return Promise.reject(exception);
  }
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
      state.sectionsIdToDelete=[];
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      const sectionId = action.payload;
      if(!state.course){
        return;
      }
      state.sectionsIdToDelete.push(sectionId);
      state.course.sections = state.course.sections.filter(section => section._id !== sectionId);
    }
  },
});

export const { setCourse, deleteSection } = courseSlice.actions;

export default courseSlice.reducer;
