import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface CourseState {
  
}

const initialState: CourseState = {
  
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {

  },
});

export const { } = courseSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectCourse = (state: RootState) => state.course.value;

export default courseSlice.reducer;
