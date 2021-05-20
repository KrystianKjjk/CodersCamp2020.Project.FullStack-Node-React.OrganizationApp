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
    setMenu(state) {
      state.showSmallMenu = true;
    },
    clearMenu(state) {
      state.showSmallMenu = false;
    }
  },
})

export const selectHeader = (state: RootState) => state.headerReducer

export const { toggleMenu, setMenu, clearMenu } = headerSlice.actions

export default headerSlice.reducer
