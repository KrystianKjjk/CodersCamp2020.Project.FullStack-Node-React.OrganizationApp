import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

interface IMenu {
  showSmallMenu: boolean
  showSmallMenuUserAction: boolean
}

const initialState: IMenu = {
  showSmallMenu: false,
  showSmallMenuUserAction: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.showSmallMenuUserAction = !state.showSmallMenuUserAction
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
