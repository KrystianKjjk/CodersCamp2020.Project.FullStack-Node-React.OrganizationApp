import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import styles from './ReusableTable.module.css';

export interface ReusableTableProps<RowType=any> {
  name: string;
  getEndpoint: string;
  xAuthToken: string;
  rows?: RowType[];
  columns?: {field: string; headerName: string; width: number; type?: string;}[];
}

const ReusableTable: React.FC< ReusableTableProps > = props => {
  return (
    <div aria-label={'Table - ' + props.name}>
      ReusableTable
      <DataGrid
        rows={props.rows}
        columns={props.columns}
      />
    </div>
  );
};

export default ReusableTable;