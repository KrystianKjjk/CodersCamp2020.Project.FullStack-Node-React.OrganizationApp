import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface MenuState {
  
}

const initialState: MenuState = {
  
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {

  },
});

export const { } = menuSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectMenu = (state: RootState) => state.menu.value;

export default menuSlice.reducer;
