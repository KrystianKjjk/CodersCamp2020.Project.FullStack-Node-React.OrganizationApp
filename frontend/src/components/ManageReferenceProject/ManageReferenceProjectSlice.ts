import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ManageReferenceProjectState {
  
}

const initialState: ManageReferenceProjectState = {
  
};

export const manageReferenceProjectSlice = createSlice({
  name: 'manageReferenceProject',
  initialState,
  reducers: {

  },
});

export const { } = manageReferenceProjectSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectManageReferenceProject = (state: RootState) => state.manageReferenceProject.value;

export default manageReferenceProjectSlice.reducer;
