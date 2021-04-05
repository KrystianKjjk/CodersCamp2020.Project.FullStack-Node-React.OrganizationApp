import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ReferenceProjectsService from "../../api/referenceProjects.service";
import BaseService from "../../app/baseService";
import {RootState} from "../../app/store";
import SectionService from "../../api/section.service";

const projectsService = new ReferenceProjectsService(new BaseService());
const sectionService = new SectionService(new BaseService());


const initialState: any = {
    loading: false,
    loaded: false,
    refProjects: [],
    sections: [],
    error: ''
};

export const fetchRefProjects: any = createAsyncThunk('refProjects/fetchAll', async () => {
      const response = await projectsService.getProjects();
      const projects = response.data;
      const result = await Promise.all( projects.map(
              async (project: any) => {
                  try {
                      const section = await sectionService.getSection(project.sectionId);
                      return {
                          ...project,
                          "Section name": section.data?.name || ''
                      }
                  }
                  catch {
                      return {
                          ...project,
                          "Section name": 'Section does not exist'
                      }
                  }

              }))
      return result;
    })

export const referenceProjectsSlice = createSlice({
        name: 'refProjects',
        initialState,
        reducers: {

        },

        extraReducers: {
            [fetchRefProjects.pending]: (state, action) => {
                if (!state.loading) state.loading = true;
            },
            [fetchRefProjects.fulfilled]: (state, action) => {
                if(state.loading) {
                    state.loading = false;
                    state.loaded = true;
                    state.refProjects = [...action.payload];
                }
            },
            [fetchRefProjects.rejected]: (state, action) => {
                if (state.loading) {
                    state.loading = false;
                    state.error = action.error
                }
            }
        },
    }

);

export const selectReferenceProjects = (state: RootState) => state.refProjects;

export const { } = referenceProjectsSlice.actions;

export default referenceProjectsSlice.reducer;
