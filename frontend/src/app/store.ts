import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import editingReducer from '../Redux/EditingSlice'
import reusableTableReducer from '../components/ReusableTable/ReusableTableSlice'
import homePageReducer from '../pages/Common/HomePage/HomePageSlice'
import courseDetails from '../pages/Admin/Course/CourseDetailsSlice'
import courseList from '../pages/Admin/CourseList/CourseListSlice'
import SnackbarReducer from '../components/Snackbar/SnackbarSlice'

export const store = configureStore({
  reducer: {
    editingInfo: editingReducer,
    tables: reusableTableReducer,
    userData: homePageReducer,
    courseDetails,
    courseList,
    snackbarDetails: SnackbarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
