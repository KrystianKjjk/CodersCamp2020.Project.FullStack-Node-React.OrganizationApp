import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface UserGradesState {
  
}

const initialState: UserGradesState = {
  
};

export const userGradesSlice = createSlice({
  name: 'userGrades',
  initialState,
  reducers: {

  },
});

export const { } = userGradesSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectUserGrades = (state: RootState) => state.userGrades.value;

export default userGradesSlice.reducer;
