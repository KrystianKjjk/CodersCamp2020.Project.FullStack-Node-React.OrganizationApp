import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import styles from './ReusableTable.module.css';

interface Column {
  field: string;
  headerName?: string;
  width?: number;
  type?: string;
}

export interface ReusableTableProps {
  name: string;
  getEndpoint?: string;
  xAuthToken?: string;
}

const ReusableTable: React.FC< ReusableTableProps > = props => {
  const columns: Column[] = [{field: 'id', width: 100}, {field: 'name', width: 100}];
  const rows = [{id: 1, name: 'Name1'}, {id: 2, name: 'Name2'}];
  return (
    <div className={styles.container} aria-label={'Table - ' + props.name}>
      ReusableTable
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default ReusableTable;