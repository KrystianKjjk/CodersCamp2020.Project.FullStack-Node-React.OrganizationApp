import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface MainViewState {
  
}

const initialState: MainViewState = {
  
};

export const mainViewSlice = createSlice({
  name: 'mainView',
  initialState,
  reducers: {

  },
});

export const { } = mainViewSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectMainView = (state: RootState) => state.mainView.value;

export default mainViewSlice.reducer;
