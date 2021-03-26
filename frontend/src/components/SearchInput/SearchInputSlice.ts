import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface SearchInputState {
  
}

const initialState: SearchInputState = {
  
};

export const searchInputSlice = createSlice({
  name: 'searchInput',
  initialState,
  reducers: {

  },
});

export const { } = searchInputSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectSearchInput = (state: RootState) => state.searchInput.value;

export default searchInputSlice.reducer;
