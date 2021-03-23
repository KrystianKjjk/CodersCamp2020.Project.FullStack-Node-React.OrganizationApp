import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface RegistrationState {
  
}

const initialState: RegistrationState = {
  
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {

  },
});

export const { } = registrationSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectRegistration = (state: RootState) => state.registration.value;

export default registrationSlice.reducer;
