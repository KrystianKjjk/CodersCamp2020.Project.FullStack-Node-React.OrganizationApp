import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'

type Filter = { column: string; values: string[] }

interface ReusableTableState {
  [name: string]: {
    loading: 'pending' | 'idle'
    rows: any[]
    displayedRows: any[]
  }
}

const initialState: ReusableTableState = {}

export const reusableTableSlice = createSlice({
  name: 'reusableTable',
  initialState,
  reducers: {
    initTable: (state, { payload }) => {
      state[payload.name] = {
        loading: 'pending',
        rows: [],
        displayedRows: [],
      }
    },
    dataLoading(state, action: PayloadAction<{ name: string }>) {
      state[action.payload.name].loading = 'pending'
    },

    dataReceived(state, action: PayloadAction<{ name: string; data: any[] }>) {
      const { name, data } = action.payload
      if (state[name].loading === 'pending') {
        state[name].rows = [...data]
        state[name].displayedRows = [...data]
        state[name].loading = 'idle'
      }
    },

    filterData(
      state,
      action: PayloadAction<{ table: string; filters: Filter[] }>,
    ) {
      const { table, filters } = action.payload
      if (!state[table] || state[table].loading !== 'idle') return
      state[table].displayedRows = [...state[table].rows]
      if (filters[0].values[0] === '') return

      filters.forEach(({ column, values }) => {
        if (values.length)
          state[table].displayedRows = state[
            table
          ].displayedRows.filter((row) => values.includes(`${row[column]}`))
      })
    },

    searchData(
      state,
      action: PayloadAction<{ table: string; column: string; search: string }>,
    ) {
      const { table, column, search } = action.payload
      if (!state[table] || state[table].loading !== 'idle') return
      state[table].displayedRows = [...state[table].rows]
      if (search === '') return
      state[table].displayedRows = state[table].displayedRows.filter((row) =>
        `${row[column]}`.match(search),
      )
    },

    sortData(
      state,
      action: PayloadAction<{ table: string; column: string; type?: string }>,
    ) {
      const { table, column, type } = action.payload
      if (column) {
        if (type && type === 'number')
          state[table].displayedRows.sort((a, b) => a - b)
        else
          state[table].displayedRows.sort((a, b) =>
            `${a[column]}`.localeCompare(`${b[column]}`),
          )
      }
    },
  },
})

export const {
  initTable,
  dataLoading,
  dataReceived,
  filterData,
  sortData,
  searchData,
} = reusableTableSlice.actions

export const fetchData = (
  name: string,
  getData: () => Promise<any[]>,
): AppThunk => async (dispatch) => {
  dispatch(dataLoading({ name }))
  const data = await getData()
  dispatch(dataReceived({ name, data }))
}

// if you want, add selectors here, change the one below, remember to register reducer in store.ts
export const selectTables = (state: RootState) => state.tables

export default reusableTableSlice.reducer
