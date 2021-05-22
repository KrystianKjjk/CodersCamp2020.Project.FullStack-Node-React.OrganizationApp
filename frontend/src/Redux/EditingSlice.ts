import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

interface InitialState {
  isEditMode: boolean
}

const initialState: InitialState = {
  isEditMode: false,
}

export const EditingSlice = createSlice({
  name: 'teamProject',
  initialState,
  reducers: {
    switchEditMode: (state) => {
      state.isEditMode = !state.isEditMode
    },
  },
})

const { switchEditMode } = EditingSlice.actions
const selectTeamProjects = (state: RootState) => state.editingInfo

export const useEditing = () => {
  const dispatch = useDispatch()
  const { isEditMode } = useSelector(selectTeamProjects)

  useEffect(() => {
    return () => {
      if (isEditMode) dispatch(switchEditMode)
    }
  }, [dispatch, isEditMode])

  return {
    isEditMode,
    switchEditMode: () => dispatch(switchEditMode()),
  }
}
export default EditingSlice.reducer
