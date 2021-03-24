import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
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
}

export interface ReusableTableProps {
  name: string;
  getData?: () => Promise<any[]>;
  columns?: Column[];
  getEndpoint?: string;
  xAuthToken?: string;
}

const ReusableTable: React.FC< ReusableTableProps > = ({
        name, 
        columns = [], 
        getData = () => Promise.resolve([]) }) => {
  // const rows = [{id: 1, name: 'Name1'}, {id: 2, name: 'Name2'}];
  const tables = useAppSelector(selectTables);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initTable({ name }));
    dispatch(fetchData(name, getData));
  }, []);

  return (
    <>
      { (tables[name] && tables[name].loading === 'idle') ? 
      (
        <div className={styles.container} aria-label={'Table - ' + name}>
          {name}
          <DataGrid
            rows={tables[name].rows}
            columns={columns}
            pageSize={5}
            autoHeight
            checkboxSelection
          />
        </div>
      ) : (<p>Loading...</p>)
      }
    </>
  );
};

export default ReusableTable;