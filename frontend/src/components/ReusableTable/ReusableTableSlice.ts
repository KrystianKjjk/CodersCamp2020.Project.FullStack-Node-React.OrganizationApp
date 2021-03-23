import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ReusableTableState {
  [name: string]: {
    rows: any[];
  }
}

const initialState: ReusableTableState = {
  
};

export const reusableTableSlice = createSlice({
  name: 'reusableTable',
  initialState,
  reducers: {
    initTable: (state, { payload }) => {
      state[payload.name] = {
        rows: [],
      }
    },
  },
});

export const { initTable } = reusableTableSlice.actions;

// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
export const selectTables = (state: RootState) => state.tables;

export default reusableTableSlice.reducer;
