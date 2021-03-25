import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ManageUserState {
  
}

const initialState: ManageUserState = {
  
};

export const manageUserSlice = createSlice({
  name: 'manageUser',
  initialState,
  reducers: {

  },
});

export const { } = manageUserSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectManageUser = (state: RootState) => state.manageUser.value;

export default manageUserSlice.reducer;
