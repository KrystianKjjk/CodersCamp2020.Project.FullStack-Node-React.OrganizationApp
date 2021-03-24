import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface StyledTextFieldState {
  
}

const initialState: StyledTextFieldState = {
  
};

export const styledTextFieldSlice = createSlice({
  name: 'styledTextField',
  initialState,
  reducers: {

  },
});

export const { } = styledTextFieldSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectStyledTextField = (state: RootState) => state.styledTextField.value;

export default styledTextFieldSlice.reducer;
