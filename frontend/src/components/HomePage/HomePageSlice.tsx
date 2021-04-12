import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import UserService from "../../api/users.service";
import {RootState} from "../../app/store";

const usersService = new UserService();

const initialState: any = {
    loading: false,
    loaded: false,
    error: false,
    userData: {},
};

export const fetchUser: any = createAsyncThunk('fetchUserData', async (userID: string) => {
    const response = await usersService.getUserMe(userID)
    const userData = response.data;
    return userData;
});


export const homePageSlice = createSlice({
        name: 'homePage',
        initialState,
        reducers: {

        },
        extraReducers: {
            [fetchUser.pending]: (state) => {
                if (!state.loading) state.loading = true;
            },
            [fetchUser.fulfilled]: (state, action) => {
                if(state.loading) state.loading = false;
                state.loaded = true;
                state.userData = {...action.payload};
            },
            [fetchUser.rejected]: (state, action) => {
                if (state.loading) state.loading = false;
                state.error = action.error;
            },
        },
    }

);
export const selectUserData = (state: RootState) => state.userData;

export const {  } = homePageSlice.actions;
export default homePageSlice.reducer;
