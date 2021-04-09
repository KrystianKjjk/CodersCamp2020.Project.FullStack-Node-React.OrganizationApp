import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ReferenceProjectsService from "../../api/referenceProjects.service";
import {RootState} from "../../app/store";
import SectionService from "../../api/section.service";

const projectsService = new ReferenceProjectsService();
const sectionService = new SectionService();


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
    });

export const addRefProject: any = createAsyncThunk('refProjects/addProject', async project => {
    const res = await projectsService.createProject(project);
    try {
        const section = await sectionService.getSection(res.data.sectionId);
        return {
            ...res.data,
            "Section name": section.data?.name || ''
        }
    }
    catch {
        return {
            ...res.data,
            "Section name": 'Section does not exist'
        }
    }
});

export const deleteRefProject: any = createAsyncThunk('refProjects/deleteProject', async (projectID: string) => {
    const res = await projectsService.deleteProject(projectID);
    return projectID;
});

export const updateRefProject: any = createAsyncThunk('refProjects/updateProject', async project => {
    const res =  await projectsService.updateProject(project);
    try {
        const section = await sectionService.getSection(res.data.sectionId);
        return {
            ...res.data,
            "Section name": section.data?.name || ''
        }
    } catch {
        return {
            ...res.data,
            "Section name": 'Section does not exist'
        }
    }
})


export const referenceProjectsSlice = createSlice({
        name: 'refProjects',
        initialState,
        reducers: {

        },

        extraReducers: {
            [fetchRefProjects.pending]: (state) => {
                if (!state.loading) state.loading = true;
            },
            [fetchRefProjects.fulfilled]: (state, action) => {
                if(state.loading) state.loading = false;
                    state.loaded = true;
                    state.refProjects = [...action.payload];
            },
            [fetchRefProjects.rejected]: (state, action) => {
                if (state.loading) state.loading = false;
                    state.error = action.error;
            },
            [addRefProject.pending]: (state) => {
                if (!state.loading) state.loading = true;
            },
            [addRefProject.fulfilled]: (state, action) => {
                if(state.loading) state.loading = false;
                    state.refProjects.push(action.payload);

            },
            [addRefProject.rejected]: (state, action) => {
                if (state.loading) state.loading = false;
                state.error = action.error;
            },
            [deleteRefProject.pending]: (state) => {
                if (!state.loading) state.loading = true;
            },
            [deleteRefProject.fulfilled]: (state, action) => {
                if(state.loading) state.loading = false;
                    state.refProjects = state.refProjects.filter((project: any) => project._id !== action.payload);
            },
            [deleteRefProject.rejected]: (state, action) => {
                if (state.loading) {
                    state.loading = false;
                    state.error = action.error;
                }
            },
            [updateRefProject.pending]: (state) => {
                if (!state.loading) state.loading = true;
            },
            [updateRefProject.fulfilled]: (state, action) => {
                if(state.loading) state.loading = false;
                console.log(action.payload);
                state.refProjects = state.refProjects.map((project: any) => {
                    if(project._id !== action.payload._id) return project;
                    return action.payload;
                })
            },
            [updateRefProject.rejected]: (state, action) => {
                if (state.loading) state.loading = false;
                    state.error = action.error;
            },
        },
    }

);

export const selectReferenceProjects = (state: RootState) => state.refProjects;

export const { } = referenceProjectsSlice.actions;

export default referenceProjectsSlice.reducer;
