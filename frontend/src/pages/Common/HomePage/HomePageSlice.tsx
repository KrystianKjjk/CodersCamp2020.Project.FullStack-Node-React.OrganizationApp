import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import UserService from '../../../api/users.service'
import { RootState } from '../../../app/store'
import SectionsService from '../../../api/sections.service'

const usersService = new UserService()
const sectionService = new SectionsService()

const initialState: any = {
  loading: false,
  loaded: false,
  error: false,
  userData: {},
}

export const fetchUser: any = createAsyncThunk(
  'fetchUserData',
  async (userID: string) => {
    const response = await usersService.getUserMe(userID)
    const userData = response.data

    const gradesExtended = await Promise.all(
      userData.grades.map(async (grade: any) => {
        try {
          if (!grade?.sectionId) throw Error
          const section = await sectionService.getSectionByID(grade.sectionId)
          return {
            ...grade,
            'Section name': section.data?.name || '',
          }
        } catch {
          return {
            ...grade,
            'Section name': 'Section does not exist',
          }
        }
      }),
    )

    userData.grades = gradesExtended
    return userData
  },
)

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      if (!state.loading) state.loading = true
    },
    [fetchUser.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false
      state.loaded = true
      state.userData = { ...action.payload }
    },
    [fetchUser.rejected]: (state, action) => {
      if (state.loading) state.loading = false
      state.error = action.error
    },
  },
})
export const selectUserData = (state: RootState) => state.userData

export default homePageSlice.reducer
