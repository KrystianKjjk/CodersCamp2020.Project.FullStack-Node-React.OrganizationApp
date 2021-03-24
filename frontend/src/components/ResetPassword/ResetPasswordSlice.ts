import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ResetPasswordState {
  
}

const initialState: ResetPasswordState = {
  
};

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {

  },
});

export const { } = resetPasswordSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectResetPassword = (state: RootState) => state.resetPassword.value;

export default resetPasswordSlice.reducer;
