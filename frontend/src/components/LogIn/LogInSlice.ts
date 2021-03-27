import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface LogInState {
  loggedInUserId: string
}

const initialState: LogInState = {
  loggedInUserId: '',
};

export const logInSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedInUserId: (state, action: PayloadAction<string>) => {
      state.loggedInUserId = action.payload
    }
  },
});

export const {setLoggedInUserId} = logInSlice.actions;
export const selectLogIn = (state: RootState) => state.login.loggedInUserId;

export default logInSlice.reducer;
