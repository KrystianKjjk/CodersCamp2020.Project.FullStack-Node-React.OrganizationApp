import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ManageGradesState {
  
}

const initialState: ManageGradesState = {
  
};

export const manageGradesSlice = createSlice({
  name: 'manageGrades',
  initialState,
  reducers: {

  },
});

export const { } = manageGradesSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectManageGrades = (state: RootState) => state.manageGrades.value;

export default manageGradesSlice.reducer;
