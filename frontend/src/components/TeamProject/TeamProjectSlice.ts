import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import BaseService from '../../app/baseService'
import axios from 'axios';

export interface TeamProjectState {
  _id: string,
  teamId: string,
  parentProjectId: string,
  projectName: string,
  projectUrl: string,
  description: string,
  mentor: string,
  referenceProjectName: string,
  sectionName: string
}

interface initialstate {
  projectEditMode: boolean,
  projectDeleteMode: boolean,
  sectionSelectionMode: boolean,
  loading: boolean,
  hasErrors: boolean,
  project: TeamProjectState 
}

export const initialProjectState = {
  _id: "loading...",
  teamId: "loading...",
  parentProjectId: "loading...",
  projectName: "loading...",
  projectUrl: "loading...",
  description: "loading...",
  mentor: "loading...",
  referenceProjectName: "loading...",
  sectionName: "loading..."
}

const initialState: initialstate = {
  projectEditMode: false,
  projectDeleteMode: false,
  sectionSelectionMode: false,
  loading: false,
  hasErrors: false,
  project: initialProjectState
};

export const teamProjectSlice = createSlice({
  name: 'teamProject',
  initialState,
  reducers: {
    projectOperation: state => {
      state.loading = true;
    },
    projectOperationSuccess: (state, { payload }) => {
      state.project = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    projectDeleteSuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    projectOperationFailure: state => {
      state.loading = true;
      state.hasErrors = true;
    },
    switchEditMode: state => {
      if (!state.loading || state.projectEditMode === true) state.projectEditMode = !state.projectEditMode;
    },
    switchDeleteMode: state => {
      if (!state.loading || state.projectDeleteMode === true) state.projectDeleteMode = !state.projectDeleteMode;
    },
    switchSectionSelectionMode: state => {
      if (!state.loading || state.projectDeleteMode === true) state.sectionSelectionMode = !state.sectionSelectionMode;
    }
  }
});

export const { 
  projectOperation, 
  projectOperationSuccess, 
  projectDeleteSuccess,
  projectOperationFailure, 
  switchEditMode, 
  switchDeleteMode,
  switchSectionSelectionMode
} = teamProjectSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
export const selectTeamProjects = (state: RootState) => state.teamProjects;

export default teamProjectSlice.reducer;

const api = new BaseService();

export function getProjectById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(projectOperation())
    try {
      const responseProject = await api.get(`/teams/projects/${id}`);
      const data = await responseProject.data;

      try {
        const responseTeam = await api.get(`teams/${data.teamId}`)
        const dataTeam = await responseTeam.data;
        data.mentor = `${dataTeam.mentor.name} ${dataTeam.mentor.surname}`;
      }
      catch (error) {
        console.log('Team', error.message)
      }

      try {
        const responseParentProject = await api.get(`/projects/${data.parentProjectId}`);
        const dataParentProject = await responseParentProject.data;
        data.referenceProjectName = dataParentProject.projectName;

        try {
          const responseSection = await api.get(`/sections/${dataParentProject.sectionId}`);
          console.log(responseSection);
          const dataSection = await responseSection.data;
          data.sectionName = dataSection.name;
        }
        catch (error) {
          console.log('Section', error.message)
        }
      }
      catch (error) {
        console.log('Parent Project', error.message)
      }

      dispatch(projectOperationSuccess(data));
    } catch (error) {
      dispatch(projectOperationFailure());
    }
  }
}

export function saveProjectById(project: Object, id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(projectOperation());

    try {
      await api.put(`/teams/projects/${id}`, JSON.stringify(project));
    } catch (error) {
      dispatch(projectOperationFailure());
    }    
    dispatch(switchEditMode());
  }
}

export function deleteProjectById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(projectOperation())
    try {
      await axios.delete(`/teams/projects/${id}`);

      dispatch(projectDeleteSuccess());
    } catch (error) {
      dispatch(projectOperationFailure());
    }
    dispatch(switchDeleteMode());
  }
}

export function saveProjectSectionById(project: Object, id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(projectOperation());

    try {
      await api.put(`/teams/projects/${id}`, JSON.stringify(project));
    } catch (error) {
      dispatch(projectOperationFailure());
    }    
    dispatch(switchEditMode());
  }
}