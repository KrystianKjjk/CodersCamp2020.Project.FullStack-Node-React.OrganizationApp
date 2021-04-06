import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import BaseService from '../../app/baseService'

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
  loading: boolean,
  hasErrors: boolean,
  project: TeamProjectState 
}

const initialState: initialstate = {
  projectEditMode: false,
  projectDeleteMode: false,
  loading: false,
  hasErrors: false,
  project: {
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
      if (!state.loading) state.projectEditMode = !state.projectEditMode;
    },
    switchDeleteMode: state => {
      if (!state.loading) state.projectDeleteMode = !state.projectDeleteMode;
    }
  }
});

export const { 
  projectOperation, 
  projectOperationSuccess, 
  projectDeleteSuccess,
  projectOperationFailure, 
  switchEditMode, 
  switchDeleteMode 
} = teamProjectSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
export const selectTeamProjects = (state: RootState) => state.teamProjects;

export default teamProjectSlice.reducer;

const api = new BaseService();

export function getProjectById(id: string, token: string) {
  return async (dispatch: Dispatch) => {
    dispatch(projectOperation())
    try {
      const responseProject = await api.get(`/projects/${id}`);
      const data = await responseProject.data;
      
      const responseTeam = await api.get(`teams/${data.teamId}`)
      const dataTeam = await responseTeam.data;
      data.mentor = `${dataTeam.mentor.name} ${dataTeam.mentor.surname}`;

      const responseParentProject = await request(
        'GET', 
        `https://coders-camp-organization-app.herokuapp.com/api/projects/${data.parentProjectId}`,
        token
        )
      const dataParentProject = await responseParentProject.json();
      data.referenceProjectName = dataParentProject.projectName;
      
      //... I don't know if this is meant to be done this way, seems kinda long :D
      const responseSection = await request(
        'GET', 
        `https://coders-camp-organization-app.herokuapp.com/api/sections/${dataParentProject.sectionId}`,
        token
        )
      const dataSection = await responseSection.json();
      data.sectionName = dataSection.name;
      dispatch(projectOperationSuccess(data));
      dispatch(switchEditMode);
    } catch (error) {
      dispatch(projectOperationFailure());
    }
  }
}

export function saveProjectById(project: Object, id :string, token: string) {
  return async (dispatch: Dispatch) => {
    dispatch(projectOperation());
    try {
      await fetch(`https://coders-camp-organization-app.herokuapp.com/api/teams/projects/${id}`,
          {
            method: 'PUT',
            headers: {   
              'Content-Type': 'application/json',
              'X-Auth-Token': token
            },
            body: JSON.stringify(project)
          });
    } catch (error) {
      dispatch(projectOperationFailure());
    }    
    dispatch(switchEditMode());
  }
}

export function deleteProjectById(id: string, token :string) {
  return async (dispatch: Dispatch) => {
    dispatch(projectOperation())
    try {
      await request(
        'DELETE', 
        `https://coders-camp-organization-app.herokuapp.com/api/teams/projects/${id}`,
        token
        );

      dispatch(projectDeleteSuccess());
    } catch (error) {
      dispatch(projectOperationFailure());
    }
    dispatch(switchDeleteMode());
  }
}


const request = async (type: string, url:string, token: string) => {
  return await fetch(url,
          {
            method: type,
            headers: {   
              'X-Auth-Token': token
             }
          });
}
