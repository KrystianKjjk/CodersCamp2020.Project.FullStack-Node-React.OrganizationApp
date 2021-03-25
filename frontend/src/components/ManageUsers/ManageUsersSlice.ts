import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ManageUsersState {
  
}

const initialState: ManageUsersState = {
  
};

export const manageUsersSlice = createSlice({
  name: 'manageUsers',
  initialState,
  reducers: {

  },
});

export const { } = manageUsersSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectManageUsers = (state: RootState) => state.manageUsers.value;

export default manageUsersSlice.reducer;
