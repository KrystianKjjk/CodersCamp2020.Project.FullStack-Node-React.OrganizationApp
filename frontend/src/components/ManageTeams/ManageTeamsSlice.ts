import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ManageTeamsState {
  
}

const initialState: ManageTeamsState = {
  
};

export const manageTeamsSlice = createSlice({
  name: 'manageTeams',
  initialState,
  reducers: {

  },
});

export const { } = manageTeamsSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectManageTeams = (state: RootState) => state.manageTeams.value;

export default manageTeamsSlice.reducer;
