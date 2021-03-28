import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface PageHeaderState {
  
}

const initialState: PageHeaderState = {
  
};

export const pageHeaderSlice = createSlice({
  name: 'pageHeader',
  initialState,
  reducers: {

  },
});

export const { } = pageHeaderSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectPageHeader = (state: RootState) => state.pageHeader.value;

export default pageHeaderSlice.reducer;
