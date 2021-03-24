import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ReusableTableState {
  [name: string]: {
    loading: 'pending' | 'idle';
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
        loading: 'pending',
        rows: [],
      };
    },
    dataLoading(state, action: PayloadAction<{name: string}>) {
      state[action.payload.name].loading = 'pending';
    },
    dataReceived(state, { payload }) {
      if (state[payload.name].loading === 'pending') {
        state[payload.name].rows = payload.data;
        state[payload.name].loading = 'idle';
      }
    },
  },
});

export const { initTable, dataLoading, dataReceived } = reusableTableSlice.actions;

export const fetchData = (name: string, getData: () => Promise<any[]>): AppThunk => async dispatch => {
  dispatch(dataLoading({ name }));
  const data = await getData();
  dispatch(dataReceived({ name, data }));
  console.log(data);
};

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
export const selectTables = (state: RootState) => state.tables;

export default reusableTableSlice.reducer;
