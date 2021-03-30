import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface FindSectionState {
  
}

const initialState: FindSectionState = {
  
};

export const findSectionSlice = createSlice({
  name: 'findSection',
  initialState,
  reducers: {

  },
});

export const { } = findSectionSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectFindSection = (state: RootState) => state.findSection.value;

export default findSectionSlice.reducer;
