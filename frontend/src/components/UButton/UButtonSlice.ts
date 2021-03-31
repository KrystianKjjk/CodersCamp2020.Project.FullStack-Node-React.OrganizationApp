import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface UButtonState {
  
}

const initialState: UButtonState = {
  
};

export const uButtonSlice = createSlice({
  name: 'uButton',
  initialState,
  reducers: {

  },
});

export const { } = uButtonSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectUButton = (state: RootState) => state.uButton.value;

export default uButtonSlice.reducer;
