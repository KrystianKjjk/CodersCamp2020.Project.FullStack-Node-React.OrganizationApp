import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import teamProjectReducer from '../components/TeamProject/TeamProjectSlice'
import reusableTableReducer from '../components/ReusableTable/ReusableTableSlice';
import referenceProjectsReducer from "../components/ReferenceProjects/ReferenceProjectsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    teamProjects: teamProjectReducer,
    tables: reusableTableReducer,
    refProjects: referenceProjectsReducer,
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
