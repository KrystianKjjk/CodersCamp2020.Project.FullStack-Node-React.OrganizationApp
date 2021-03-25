import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ButtonState {
  
}

const initialState: ButtonState = {
  
};

export const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {

  },
});

export const { } = buttonSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectButton = (state: RootState) => state.button.value;

export default buttonSlice.reducer;
