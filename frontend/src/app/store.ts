import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import reusableTableReducer from '../components/ReusableTable/ReusableTableSlice';
import teamProjectsReducer from '../components/TeamProjects/TeamProjectsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tables: reusableTableReducer,
    teamProjects: teamProjectsReducer,
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
