import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import reusableTableReducer from '../components/ReusableTable/ReusableTableSlice';
import course from '../components/Course/CourseSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tables: reusableTableReducer,
    course
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
