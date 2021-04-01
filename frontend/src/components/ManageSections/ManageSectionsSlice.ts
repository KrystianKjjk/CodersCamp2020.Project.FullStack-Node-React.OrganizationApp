import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ManageSectionsState {
  
}

const initialState: ManageSectionsState = {
  
};

export const manageSectionsSlice = createSlice({
  name: 'manageSections',
  initialState,
  reducers: {

  },
});

export const { } = manageSectionsSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectManageSections = (state: RootState) => state.manageSections.value;

export default manageSectionsSlice.reducer;
