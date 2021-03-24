import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ContentBoxState {
  
}

const initialState: ContentBoxState = {
  
};

export const contentBoxSlice = createSlice({
  name: 'contentBox',
  initialState,
  reducers: {

  },
});

export const { } = contentBoxSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectContentBox = (state: RootState) => state.contentBox.value;

export default contentBoxSlice.reducer;
