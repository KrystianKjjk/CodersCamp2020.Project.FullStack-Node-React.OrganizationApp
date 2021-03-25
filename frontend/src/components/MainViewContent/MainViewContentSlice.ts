import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface MainViewContentState {
  
}

const initialState: MainViewContentState = {
  
};

export const mainViewContentSlice = createSlice({
  name: 'mainViewContent',
  initialState,
  reducers: {

  },
});

export const { } = mainViewContentSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectMainViewContent = (state: RootState) => state.mainViewContent.value;

export default mainViewContentSlice.reducer;
