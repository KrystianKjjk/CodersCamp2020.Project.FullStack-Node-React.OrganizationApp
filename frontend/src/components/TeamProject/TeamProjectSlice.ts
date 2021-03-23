import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface TeamProjectState {
  
}

const initialState: TeamProjectState = {
  
};

export const teamProjectSlice = createSlice({
  name: 'teamProject',
  initialState,
  reducers: {

  },
});

export const { } = teamProjectSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectTeamProject = (state: RootState) => state.teamProject.value;

export default teamProjectSlice.reducer;
