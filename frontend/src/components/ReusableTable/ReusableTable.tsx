import React, { useEffect, MouseEvent } from 'react';
import { DataGrid, GridRowParams } from '@material-ui/data-grid';
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
  valueGetter?: (params: {getValue: (fieldName: string) => any}) => any;
}

export interface ReusableTableProps {
  name: string;
  getData?: () => Promise<any[]>;
  columns?: Column[];
  onRowClick?: (params: GridRowParams, e: MouseEvent) => void;
}

const ReusableTable: React.FC< ReusableTableProps > = ({
        name, 
        columns = [], 
        getData = () => Promise.resolve([]),
        onRowClick = (params, e) => {} }) => {
  
  const tables = useAppSelector(selectTables);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initTable({ name }));
    dispatch(fetchData(name, getData));
  }, []);
  return (
    <>
      { 
        ( !tables[name] || tables[name].loading !== 'idle' ) ? (<p>Loading...</p>) :
        (
          <div className={styles.container} aria-label={'Table - ' + name}>
            {name}
            <DataGrid
              rows={tables[name].rows}
              columns={columns}
              pageSize={5}
              autoHeight
              checkboxSelection
              disableSelectionOnClick={true}
              onRowClick={onRowClick}
            />
          </div>
        ) 
      }
    </>
  );
};

export default ReusableTable;