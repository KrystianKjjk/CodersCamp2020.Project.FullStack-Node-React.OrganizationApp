import React, { useEffect, useState } from 'react'
import { DataGrid, DataGridProps } from '@material-ui/data-grid'
import styles from './ReusableTable.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { initTable, fetchData, selectTables } from './ReusableTableSlice'
import { LinearProgress } from '@material-ui/core'

interface Column {
  field: string
  headerName?: string
  width?: number
  type?: string
  description?: string
  sortable?: boolean
  valueGetter?: (params: { getValue: (fieldName: string) => any }) => any
  sortComparator?: (v1: any, v2: any, cellParams1: any, cellParams2: any) => any
}

export type ReusableTableProps = {
  name: string
  getData?: () => Promise<any[]>
  columns?: Column[]
} & Omit<DataGridProps, 'rows'>

const ReusableTable: React.FC<ReusableTableProps> = ({
  name,
  columns = [],
  getData = () => Promise.resolve([]),
  ...restOfProps
}) => {
  const tables = useAppSelector(selectTables)
  const dispatch = useAppDispatch()
  const [tableName] = useState(name)

  useEffect(() => {
    dispatch(initTable({ name: tableName }))
    dispatch(fetchData(tableName, getData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData])

  return (
    <>
      {!tables[tableName] || tables[tableName].loading !== 'idle' ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container} aria-label={'Table - ' + tableName}>
          <DataGrid
            rows={tables[tableName].displayedRows}
            columns={columns}
            pageSize={5}
            autoHeight
            disableSelectionOnClick={true}
            {...restOfProps}
          />
        </div>
      )}
    </>
  )
}

export default ReusableTable

export type ReusableTableReactQueryProps = {
  name: string
  columns?: Column[]
  isLoading: boolean
  error: unknown
  data?: any[]
  isFetching: boolean
} & Omit<DataGridProps, 'rows'>

const ReusableTableReactQueryFC: React.FC<ReusableTableReactQueryProps> = ({
  name,
  columns = [],
  isLoading,
  error,
  data,
  isFetching,
  ...restOfProps
}) => {
  const [tableName] = useState(name)

  if (isLoading) return <LinearProgress />
  if (error) return <div>{error.message}</div>
  if (data === undefined) return <div>Error</div>
  return (
    <div className={styles.container} aria-label={'Table - ' + tableName}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        autoHeight
        disableSelectionOnClick={true}
        {...restOfProps}
      />
    </div>
  )
}

export const ReusableTableReactQuery = React.memo(ReusableTableReactQueryFC)
