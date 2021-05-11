import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Color } from '@material-ui/lab/Alert'

interface SnackbarState {
  message: string
  severity: Color
  isOpen: boolean
}

const initialState: SnackbarState = {
  message: '',
  severity: 'success',
  isOpen: false,
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; severity: Color }>,
    ) => {
      state.isOpen = true
      state.message = action.payload.message
      state.severity = action.payload.severity
    },
    hideSnackbar: (state) => {
      state.isOpen = false
    },
  },
})

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions

export const selectSnackbarInfo = (state: RootState) => state.snackbarDetails

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
// export const selectSnackbar = (state: RootState) => state.snackbar.value;

export default snackbarSlice.reducer
