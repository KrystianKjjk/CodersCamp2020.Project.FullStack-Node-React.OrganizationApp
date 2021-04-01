import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface CourseCreateState {
  
}

const initialState: CourseCreateState = {
  
};

// const createCourse = 

const courseCreateSlice = createSlice({
  name: 'courseCreate',
  initialState,
  reducers: {

  },
});

export const {} = courseCreateSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectCourseCreator = (state: RootState) => state.courseCreator.value;

export default courseCreateSlice.reducer;
