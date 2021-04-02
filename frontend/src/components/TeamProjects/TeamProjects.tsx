import React, { useState, useEffect } from 'react';
import styles from './TeamProjects.module.css';
import ReusableTable from '../ReusableTable/index'
import { useAppDispatch } from '../../app/hooks';
import { getTeamProjects } from '../../api/getTeamProjects'


export interface TeamProjectsProps {
  course: string;
  getFunction: () => Promise<any[]>;
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

  //@ts-ignore
  const MainView = (props) => {
    return props.detailedView ? <div onClick={() => setDetailedView(false)}>{props.children(selectedProjectId)}</div> : <Table/>
  }

  return (
    <div>
      <div className={styles.header} aria-label='TeamProjectsHeader'>
        <h2>{Header(detailedView)}</h2>
      </div>

      <div className={styles.main}>
        <MainView detailedView={detailedView}/>
      </div>
    </div>
  );
};

export default TeamProjects;