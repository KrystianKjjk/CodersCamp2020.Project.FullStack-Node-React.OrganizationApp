import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import reusableTableReducer from '../components/ReusableTable/ReusableTableSlice';
import courseDetails from '../components/Course/CourseDetailsSlice';
import courseList from '../components/CourseList/CourseListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tables: reusableTableReducer,
    courseDetails,
    courseList
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
