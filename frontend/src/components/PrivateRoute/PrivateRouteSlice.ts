import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface PrivateRouteState {
  
}

const initialState: PrivateRouteState = {
  
};

export const privateRouteSlice = createSlice({
  name: 'privateRoute',
  initialState,
  reducers: {

  },
});

export const { } = privateRouteSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectPrivateRoute = (state: RootState) => state.privateRoute.value;

export default privateRouteSlice.reducer;
