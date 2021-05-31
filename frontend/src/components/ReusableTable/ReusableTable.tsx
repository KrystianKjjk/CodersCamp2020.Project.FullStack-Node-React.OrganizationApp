import React, { useState } from 'react'
import { DataGrid, DataGridProps } from '@material-ui/data-grid'
import styles from './ReusableTable.module.css'
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
  columns?: Column[]
  isLoading: boolean
  error: unknown
  data?: any[]
  isFetching: boolean
} & Omit<DataGridProps, 'rows'>

const ReusableTableFC: React.FC<ReusableTableProps> = ({
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
  if (error) {console.trace(); return <div>{error.message}</div>}
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

export default React.memo(ReusableTableFC)
