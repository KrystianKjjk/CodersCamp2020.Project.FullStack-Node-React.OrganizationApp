import { createSlice, PayloadAction, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

export interface TeamProjectState {
  _id: string,
  teamId: string,
  parentProjectIds: string,
  projectName: string,
  projectUrl: string,
  description: string
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
    _id: "",
    teamId: "",
    parentProjectIds: "",
    projectName: "",
    projectUrl: "",
    description: ""
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
      state.projectEditMode = !state.projectEditMode;
    },
    switchDeleteMode: state => {
      state.projectDeleteMode = !state.projectDeleteMode;
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


export function getProjectById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(projectOperation())
    try {
      const response = await fetch(`https://coders-camp-organization-app.herokuapp.com/api/projects/${id}`,
          {
            method: 'GET',
            headers: {   
              'X-Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRmYmFlMWEyZTM4ZDAwMTVlZTQxZWQiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTA3NDksImV4cCI6MTYxNjc5MTk0OX0.cYNseRM97U7IgwXKVQgRwBVd7SQWpeHJ4grgWUqsf6w'
            }
          });
      const data = await response.json();
      dispatch(projectOperationSuccess(data));
      dispatch(switchEditMode);
    } catch (error) {
      dispatch(projectOperationFailure());
    }
  }
}

export function saveProjectById(project: Object, id :string) {
  return async (dispatch: Dispatch) => {
    dispatch(projectOperation());
    try {
      const response = await fetch(`https://coders-camp-organization-app.herokuapp.com/api/projects/${id}`,
          {
            method: 'PATCH',
            headers: {   
              'Content-Type': 'application/json',
              'X-Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRmYmFlMWEyZTM4ZDAwMTVlZTQxZWQiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTA3NDksImV4cCI6MTYxNjc5MTk0OX0.cYNseRM97U7IgwXKVQgRwBVd7SQWpeHJ4grgWUqsf6w'
            },
            body: JSON.stringify(project)
          });
      const data = await response.json();
      dispatch(projectOperationSuccess(data));
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
      await fetch(`https://coders-camp-organization-app.herokuapp.com/api/projects/${id}`,
          {
            method: 'DELETE',
            headers: {   
              'X-Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRmYmFlMWEyZTM4ZDAwMTVlZTQxZWQiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTA3NDksImV4cCI6MTYxNjc5MTk0OX0.cYNseRM97U7IgwXKVQgRwBVd7SQWpeHJ4grgWUqsf6w'
            }
          });
      dispatch(projectDeleteSuccess());
    } catch (error) {
      dispatch(projectOperationFailure());
    }
    dispatch(switchDeleteMode());
  }
}
