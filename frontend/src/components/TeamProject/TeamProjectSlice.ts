import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface TeamProjectState {
  _id: string,
  teamId: string,
  parentProjectIds: string,
  projectName: string,
  projectUrl: string,
  description: string
}

const initialProjects: TeamProjectState = {
  _id: "123",
  teamId: "123123",
  parentProjectIds: "!23123",
  projectName: "FitNotFat",
  projectUrl: "fitnotfat.com",
  description: "Aplikacja dostarcza użytkownikowi informacje ile kalorii dziennie powinien spożywać, aby osiągnąć określony cel: utrzymać obecną wagę, schudnąć lub zwiększyć masę ciała."
};

const initialStateTable = {
  projectEditMode: false,
  projects: [initialProjects]
}

export const teamProjectSlice = createSlice({
  name: 'teamProject',
  initialState: initialStateTable,
  reducers: {
    getSelectedTeamData: (state, {payload:id}) => {

    },
    updateSelectedTeamData: (state, {payload:id}) => {

    },
    switchEditMode: state => {
      state.projectEditMode = !state.projectEditMode;
    }
  },
});

export const { getSelectedTeamData, updateSelectedTeamData, switchEditMode } = teamProjectSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
export const selectTeamProjects = (state: RootState) => state.teamProjects;

export default teamProjectSlice.reducer;
