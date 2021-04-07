import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface SectionViewState {
  
}

const initialState: SectionViewState = {
  
};

export const sectionViewSlice = createSlice({
  name: 'sectionView',
  initialState,
  reducers: {

  },
});

export const { } = sectionViewSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectSectionView = (state: RootState) => state.sectionView.value;

export default sectionViewSlice.reducer;
