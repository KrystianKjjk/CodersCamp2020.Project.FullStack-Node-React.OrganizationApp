import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface LogInState {
  
}

const initialState: LogInState = {
  
};

export const logInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {

  },
});

export const { } = logInSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectLogIn = (state: RootState) => state.logIn.value;

export default logInSlice.reducer;
