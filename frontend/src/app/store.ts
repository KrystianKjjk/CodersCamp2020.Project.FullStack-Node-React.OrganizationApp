import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import teamProjectReducer from '../components/TeamProject/TeamProjectSlice'
import reusableTableReducer from '../components/ReusableTable/ReusableTableSlice';
import homePageReducer from '../components/HomePage/HomePageSlice';

export const store = configureStore({
  reducer: {
    teamProjects: teamProjectReducer,
    tables: reusableTableReducer,
    userData: homePageReducer
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
