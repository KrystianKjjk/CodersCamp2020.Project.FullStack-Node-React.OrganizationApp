import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchRefProjects, selectReferenceProjects} from "./ReferenceProjectsSlice";
import {Box, CircularProgress} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import UButton from "../UButton";
import ReusableTable from "../ReusableTable";

import styles from './ReferenceProjects.module.css';
import {mainTheme} from "../../theme/customMaterialTheme";
import PageHeader from '../PageHeader';

export interface ReferenceProjectsProps {
}

const ReferenceProjects: React.FC< ReferenceProjectsProps > = props => {

  const dispatch = useDispatch();
  const {refProjects, loading, loaded, error} = useSelector(selectReferenceProjects);
  const history = useHistory();

    const activeCourse = localStorage.getItem('activeCourse');
    const courseID: string = activeCourse ? JSON.parse(activeCourse)._id : null;

  useEffect(() => {
    if(!loaded) dispatch(fetchRefProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loaded]);

    const columns = [
        {field: 'Name', width: 500},
        {field: 'Section name', width: -1},
    ];

    function getReferenceProjects(): Promise<any[]> {
        const projects = refProjects
                .filter( (project: any) => {
                    if(courseID) return project.course === courseID;
                    return project;
                })
                .map((project: any) => ({
                    id: project._id,
                    Name: project.projectName,
                    'Section name': project["Section name"]
                }));
        // @ts-ignore
        return Promise.resolve(projects);
    }

    function handleSelection(params: any, e: any) {
        const sectionID: string = params.row.id;
        const path = `projects/${sectionID}`;
        history.push(path);
    }

    function handleAddButton(e: any) {
        const path = `projects/add`;
        history.push(path);
    }


  if (error) {
    return <div className={styles.error}>Error</div>;
  } else if (loading) {
    return <CircularProgress className={styles.loading}/>
  } else {
    return (
        <ThemeProvider theme={mainTheme}>
           <PageHeader name="Projects"/>
          <Box className={styles.container}>
            <Box display="flex" className={styles.container__header}>
              <span>Manage Reference Projects</span>
              <div className={styles.container__header__button}>
                <UButton
                    text='ADD'
                    color='primary'
                    onClick={handleAddButton} />
              </div>
            </Box>
              <div className={styles.projectsTable}>
                  <ReusableTable
                      name=""
                      getData={getReferenceProjects}
                      columns={columns}
                      onRowClick={handleSelection}
                  />
              </div>
          </Box>
        </ThemeProvider>
    )}
};

export default ReferenceProjects;
