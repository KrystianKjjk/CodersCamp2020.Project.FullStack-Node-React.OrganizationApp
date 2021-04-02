import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ReferenceProjectsState {
  
}

const initialState: ReferenceProjectsState = {
  
};

export const referenceProjectsSlice = createSlice({
  name: 'referenceProjects',
  initialState,
  reducers: {

  },
});

export const { } = referenceProjectsSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectReferenceProjects = (state: RootState) => state.referenceProjects.value;

export default referenceProjectsSlice.reducer;
