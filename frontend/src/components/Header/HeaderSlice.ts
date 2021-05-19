import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

interface IHeader {
  showSmallMenu: boolean
}

const initialState: IHeader = {
  showSmallMenu: false,
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.showSmallMenu = !state.showSmallMenu
    },
  },
})

export const selectHeader = (state: RootState) => state.headerReducer

export const { toggleMenu } = headerSlice.actions

export default headerSlice.reducer
