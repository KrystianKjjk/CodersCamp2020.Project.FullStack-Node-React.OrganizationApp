import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as ActiveCourse from '../../../app/utils'

export interface CourseListElementModel {
  _id: string
  name: string
  description?: string
  startDate: string
  endDate: string
}

interface CourseListState {
  activeCourse?: CourseListElementModel
}

const initialState: CourseListState = {
  activeCourse: ActiveCourse.getActiveCourse(),
}

export const courseListSlice = createSlice({
  name: 'courseList',
  initialState,
  reducers: {
    setActiveCourse: (state, action: PayloadAction<CourseListElementModel>) => {
      const course = action.payload
      ActiveCourse.setActiveCourse(course)
      state.activeCourse = course
    },
  },
})

export const { setActiveCourse } = courseListSlice.actions

export default courseListSlice.reducer
