import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface EditableFieldState {
  
}

const initialState: EditableFieldState = {
  
};

export const editableFieldSlice = createSlice({
  name: 'editableField',
  initialState,
  reducers: {

  },
});

export const { } = editableFieldSlice.actions;

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectEditableField = (state: RootState) => state.editableField.value;

export default editableFieldSlice.reducer;
