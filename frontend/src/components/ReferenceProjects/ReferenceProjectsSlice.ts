import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ReferenceProjectsService from "../../api/referenceProjects.service";
import {RootState} from "../../app/store";
import SectionService from "../../api/sections.service";
import BaseService from "../../app/baseService";

const projectsService = new ReferenceProjectsService();
const sectionService = new SectionService(new BaseService());

const initialState: any = {
    loading: false,
    loaded: false,
    refProjects: [],
    sections: [],
    error: '',
    actionError: false,
    actionSuccess: false,
};

export const fetchRefProjects: any = createAsyncThunk('refProjects/fetchAll', async () => {
    const response = await projectsService.getProjects();
    const projects = response.data;
    const projectsExtended = await Promise.all(projects.map(
        async (project: any) => {
            try {
                const section = await sectionService.getSectionByID(project.sectionId);
                return {
                    ...project,
                    "Section name": section.data?.name || '',
                    course: section.data.course,
                }
            }
            catch {
                return {
                    ...project,
                    "Section name": 'Section does not exist'
                }
            }
        }));

    return projectsExtended;
});


export const addRefProject: any = createAsyncThunk('refProjects/addProject', async project => {
    const res = await projectsService.createProject(project);
    try {
        const section = await sectionService.getSectionByID(res.data.sectionId);
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
        const section = await sectionService.getSectionByID(res.data.sectionId);
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
            clearActionError(state) {
                state.actionError = false;
            },
            clearActionSuccess(state) {
                state.actionSuccess = false;
            },
            clearLoaded(state) {
                state.loaded = false;
            },
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
                state.actionSuccess = true;
            },
            [addRefProject.rejected]: (state, action) => {
                if (state.loading) state.loading = false;
                state.actionError = true;
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
                    state.actionError = true;
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
                state.actionSuccess = true;
            },
            [updateRefProject.rejected]: (state, action) => {
                if (state.loading) state.loading = false;
                state.actionError = true;
            },
        },
    }

);

export const selectReferenceProjects = (state: RootState) => state.refProjects;

export const { clearActionError, clearActionSuccess, clearLoaded } = referenceProjectsSlice.actions;

export default referenceProjectsSlice.reducer;
