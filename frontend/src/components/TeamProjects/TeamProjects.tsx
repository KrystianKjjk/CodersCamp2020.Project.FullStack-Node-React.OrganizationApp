import React, { useState, ReactElement } from 'react';
import styles from './TeamProjects.module.css';
import ReusableTable from '../ReusableTable/index'


export interface TeamProjectsProps {
  course: string,
  getFunction: () => Promise<any[]>,
  editComponent: Function
}

interface MainViewProps {
  detailedView: boolean,
  editComponent: Function
}

enum HeaderText {
  MAIN = "TEAM PROJECTS",
  EDIT = `EDIT TEAM PROJECT`
}

const TeamProjects: React.FC<TeamProjectsProps> = props => {

  const [detailedView, setDetailedView] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState({});  

  const columns = [
    { field: 'Name', width: 300 },
    { field: 'Mentor', width: 200 },
    { field: 'ReferenceProject', width: 200 },
    { field: 'Section', width: 200 },
  ];

  const Header = (detailedView: boolean): HeaderText => {
    return detailedView ? HeaderText.EDIT : HeaderText.MAIN
  }

  const Table = () => {
    return (
      <div className={styles.table}>        
        <ReusableTable
          name="Manage Team Projects"
          getData={props.getFunction}
          columns={columns}
          onRowClick={(params, e) => {
              setDetailedView(true);
              setSelectedProjectId(params.row.id);
          }}
        />
      </div>      
    )
  }

const MainView = (props: MainViewProps) => {
    return props.detailedView ? <div onClick={() => setDetailedView(false)}>{props.editComponent()}</div> : <Table/>
  }

const EditView = () => {
  return props.editComponent(selectedProjectId, setDetailedView)
}

  return (
    <div>
      <div className={styles.header} aria-label='TeamProjectsHeader'>
        <h2>{Header(detailedView)}</h2>
      </div>

      <div className={styles.main}>
        <MainView detailedView={detailedView} editComponent={EditView}/>
      </div>
    </div>
  );
};

export default TeamProjects;