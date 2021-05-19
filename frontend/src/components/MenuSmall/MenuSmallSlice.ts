import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface MenuSmallState {
  
}

const initialState: MenuSmallState = {
  
};

export const menuSmallSlice = createSlice({
  name: 'menuSmall',
  initialState,
  reducers: {

  },
});

export const { } = menuSmallSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectMenuSmall = (state: RootState) => state.menuSmall.value;

export default menuSmallSlice.reducer;
