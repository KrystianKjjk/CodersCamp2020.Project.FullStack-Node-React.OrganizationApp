import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ReusableTableState {
  
}

const initialState: ReusableTableState = {
  
};

export const reusableTableSlice = createSlice({
  name: 'reusableTable',
  initialState,
  reducers: {

  },
});

export const { } = reusableTableSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectReusableTable = (state: RootState) => state.reusableTable.value;

export default reusableTableSlice.reducer;
