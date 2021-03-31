import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface TeamProjectsState {
  projects: Object[]
}

const initialState: TeamProjectsState = {
  projects: []
};

export const teamProjectsSlice = createSlice({
  name: 'teamProjects',
  initialState,
  reducers: {
      getProjectsSuccess: (state, { payload }) => {
        state.projects = payload;
      }
  },
});

export const { getProjectsSuccess } = teamProjectsSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
 export const selectTeamProjects = (state: RootState) => state.teamProjects;

export default teamProjectsSlice.reducer;


export function getProjects() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRmYmFlMWEyZTM4ZDAwMTVlZTQxZWQiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTA3NDksImV4cCI6MTYxNjc5MTk0OX0.cYNseRM97U7IgwXKVQgRwBVd7SQWpeHJ4grgWUqsf6w';
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`https://coders-camp-organization-app.herokuapp.com/api/projects/`,
          {
            method: 'GET',
            headers: {   
              'X-Auth-Token': token
            }
          });
         
          console.log(response)
      const data = await response.json();
      dispatch(getProjectsSuccess(data));
    } catch (error) {
      console.log(error);
    }
  }
}