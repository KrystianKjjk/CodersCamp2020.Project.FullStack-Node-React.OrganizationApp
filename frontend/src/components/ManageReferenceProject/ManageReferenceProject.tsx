import React, {useEffect, useState} from 'react';
import styles from './ManageReferenceProject.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Box, Breadcrumbs, Link, Snackbar, Typography} from "@material-ui/core";
import UButton from "../UButton";
import MuiAlert from '@material-ui/lab/Alert';
import {ThemeProvider} from "@material-ui/styles";
import {mainTheme} from "../../theme/customMaterialTheme";
import EditableField from "../EditableField";

export interface ManageReferenceProjectProps {
}

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageReferenceProject = (props: any) => {
  const projectID = props.match.params.projectID;
  const dispatch = useDispatch();

  let tmp: any;
  const [isEdit, setIsEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [project, setProject] = useState<any>();

  useSelector((state: any) => {
    tmp = state.refProjects.refProjects.find((project: any) => project._id === projectID);
  });

  useEffect(()=> {
    setProject(tmp)
  },[tmp]);

  function toggleEdit() {
    setIsEdit(!isEdit);
  }

  return (
      <ThemeProvider theme={mainTheme}>
        <Breadcrumbs aria-label="breadcrumb" color="primary" className={styles.breadcrumbs}>
          <Link href="/projects" color="primary">PROJECTS </Link>
          <Typography color="primary">{projectID}</Typography>
        </Breadcrumbs>
        {console.log(project)}

        <Box className={styles.container}>
          <Box display="flex" className={styles.container__header}>
            <span>Manage project</span>
            <div className={styles.container__header__button}>
              <UButton
                  text='DELETE'
                  color='secondary'
                  onClick={()=>{}} />
              {isEdit ? (
                  <UButton
                      text='SAVE'
                      color='primary'
                      onClick={toggleEdit} />
              ) : (
                  <UButton
                      text='EDIT'
                      color='primary'
                      onClick={toggleEdit}
                  />
              )}
            </div>
          </Box>
          <form className={`${styles.manageForm} ${styles.container__body}`}>
            <EditableField isEdit={isEdit}
                           fieldName={"Name:"}
                           fieldValue={project?.projectName}
                           placeholder={project?.projectName}
                           onChange={()=>{}}
            />

            <EditableField isEdit={isEdit}
                           fieldName={"Section name:"}
                           fieldValue={project?.["Section name"]}
                           placeholder={project?.["Section name"]}
                           onChange={()=>{}}
            />

            <EditableField isEdit={isEdit}
                           fieldName={"URL:"}
                           fieldValue={project?.projectUrl}
                           placeholder={project?.projectUrl}
                           onChange={()=>{}}
            />

            <EditableField isEdit={isEdit}
                           fieldName={"Description:"}
                           fieldValue={project?.description}
                           placeholder={project?.description}
                           onChange={()=>{}}
                           textArea={true}
            />

          </form>

        </Box>
      </ThemeProvider>
  );
};

export default ManageReferenceProject;
