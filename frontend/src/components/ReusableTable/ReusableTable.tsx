import React, { useEffect, useState } from 'react';
import { DataGrid, DataGridProps } from '@material-ui/data-grid';
import styles from './ReusableTable.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { 
  initTable,
  fetchData,
  selectTables
} from './ReusableTableSlice';

interface Column {
  field: string;
  headerName?: string;
  width?: number;
  type?: string;
  description?: string;
  sortable?: boolean;
  valueGetter?: (params: {getValue: (fieldName: string) => any}) => any;
  sortComparator?: (v1: any, v2: any, cellParams1: any, cellParams2: any) => any;
}

export type ReusableTableProps = {
  name: string;
  getData?: () => Promise<any[]>;
  columns?: Column[];
} & Omit<DataGridProps, 'rows'>;

const ReusableTable: React.FC< ReusableTableProps > = ({
        name, 
        columns = [], 
        getData = () => Promise.resolve([]),
        ...restOfProps }) => {
  
  const tables = useAppSelector(selectTables);
  const dispatch = useAppDispatch();
  const [tableName] = useState(name);

  useEffect(() => {
    dispatch(initTable({ name: tableName }));
    dispatch(fetchData(tableName, getData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]);

  return (
    <>
      { 
        ( !tables[tableName] || tables[tableName].loading !== 'idle' ) ? (<p>Loading...</p>) :
        (
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
        ) 
      }
    </>
  );
};

export default ReusableTable;
