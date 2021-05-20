import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseState } from '../../../models'

const initialState: CourseState = { sectionsIdToDelete: [] }

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    resetSectionsToDelete: (state) => {
      state.sectionsIdToDelete = []
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      const sectionId = action.payload
      state.sectionsIdToDelete.push(sectionId)
    },
  },
})

export const { resetSectionsToDelete, deleteSection } = courseSlice.actions

export default courseSlice.reducer
