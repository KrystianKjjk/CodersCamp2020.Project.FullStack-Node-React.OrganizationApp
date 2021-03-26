import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface HomePageState {
  
}

const initialState: HomePageState = {
  
};

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {

  },
});

export const { } = homePageSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectHomePage = (state: RootState) => state.homePage.value;

export default homePageSlice.reducer;
