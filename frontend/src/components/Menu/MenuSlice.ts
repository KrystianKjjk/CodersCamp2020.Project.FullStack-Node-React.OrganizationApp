import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

interface IMenu {
  showSmallMenu: boolean
}

const initialState: IMenu = {
  showSmallMenu: false,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.showSmallMenu = !state.showSmallMenu
    },
    setMenu(state) {
      state.showSmallMenu = true
    },
    clearMenu(state) {
      state.showSmallMenu = false
    },
  },
})

export const selectMenu = (state: RootState) => state.menuReducer

export const { toggleMenu, setMenu, clearMenu } = menuSlice.actions

export default menuSlice.reducer
