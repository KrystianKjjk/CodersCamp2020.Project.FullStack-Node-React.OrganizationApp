import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface HeaderState {
  
}

const initialState: HeaderState = {
  
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {

  },
});

export const { } = headerSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectHeader = (state: RootState) => state.header.value;

export default headerSlice.reducer;
