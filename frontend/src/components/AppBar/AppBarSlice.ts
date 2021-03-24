import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface AppBarState {
  
}

const initialState: AppBarState = {
  
};

export const appBarSlice = createSlice({
  name: 'appBar',
  initialState,
  reducers: {

  },
});

export const { } = appBarSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectAppBar = (state: RootState) => state.appBar.value;

export default appBarSlice.reducer;
