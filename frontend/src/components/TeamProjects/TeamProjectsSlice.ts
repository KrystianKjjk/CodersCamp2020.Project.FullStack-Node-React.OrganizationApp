import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface TeamProjectsState {
  
}

const initialState: TeamProjectsState = {
  
};

export const teamProjectsSlice = createSlice({
  name: 'teamProjects',
  initialState,
  reducers: {

  },
});

export const { } = teamProjectsSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectTeamProjects = (state: RootState) => state.teamProjects.value;

export default teamProjectsSlice.reducer;
