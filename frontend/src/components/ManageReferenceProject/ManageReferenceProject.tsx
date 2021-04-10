import React, {useEffect, useState} from 'react';
import styles from './ManageReferenceProject.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography
} from "@material-ui/core";
import UButton from "../UButton";
import MuiAlert from '@material-ui/lab/Alert';
import {ThemeProvider} from "@material-ui/styles";
import {mainTheme} from "../../theme/customMaterialTheme";
import EditableField from "../EditableField";
import {addRefProject, deleteRefProject, updateRefProject} from "../ReferenceProjects/ReferenceProjectsSlice";
import {useHistory} from "react-router-dom";
import FindSection from "../FindSection";
import ConfirmationDialog from "../ConfirmationDialog";

export interface ManageReferenceProjectProps {
}

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageReferenceProject = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();


  const projectID = props.match.params.projectID;

  const [isEdit, setIsEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [project, setProject] = useState<any>();

  useEffect(()=>{
    setIsAdding(props.isAdding);
  },[]);

  useEffect(()=>{
    if(isAdding) setIsEdit(true);
  },[isAdding]);


  let tmp: any;
  useSelector((state: any) => {
    tmp = state.refProjects.refProjects.find((project: any) => project._id === projectID);
  });

  useEffect(()=> {
    setProject(tmp)
  },[tmp]);

  function toggleEdit() {
    setIsEdit(!isEdit);
  }

  function handleInputChange(event: any) {
    const target = event.target;
    const name = target.id;
    let value = target.value;
    if (name === "sectionId") value = parseInt(value,10);
    // @ts-ignore
    setProject({
      ...project,
      [name]: value
    })
  }

  function handleSave() {
    if(isAdding) {
      dispatch(addRefProject(project));
      setIsAdding(false);
    }
    else {
      dispatch(updateRefProject(project));
    }
    toggleEdit();
  }

  function handleDelete() {
    if(!isAdding) {
      dispatch(deleteRefProject(project._id));
    }
    if(isEdit) toggleEdit();

    handleCloseDeleteConfirmation();
    history.push('/projects');
  }

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleOpenDeleteConfirmation = () => {
    setIsOpenDelete(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setIsOpenDelete(false);
  };

  const [isOpenSectionsModal, setIsOpenSectionsModal] = useState(false);

  function openSectionsModal() {
    setIsOpenSectionsModal(true)
  }
  function closeSectionsModal() {
    setIsOpenSectionsModal(false)
  }

  function handleSectionSelection(sectionID: string, sectionName: string) {
    closeSectionsModal();
    setProject({
      ...project,
      sectionId: sectionID,
      "Section name": sectionName
    });
  }

  return (
      <ThemeProvider theme={mainTheme}>
        <ConfirmationDialog
            title="Are you sure you want to delete the project?"
            content="This action is irreversible."
            isOpen={isOpenDelete}
            onClose={handleCloseDeleteConfirmation }
            handleConfirm={handleDelete}
            handleCancel={handleCloseDeleteConfirmation}
        />
        <Breadcrumbs aria-label="breadcrumb" color="primary" className={styles.breadcrumbs}>
          <Link href="/projects" color="primary">PROJECTS </Link>
          <Typography color="primary">{projectID}</Typography>
        </Breadcrumbs>
        <Box className={styles.container}>
          <Box display="flex" className={styles.container__header}>
            <span>Manage project</span>
            <div className={styles.container__header__button}>
              <UButton
                  text='DELETE'
                  color='secondary'
                  onClick={handleOpenDeleteConfirmation} />
              {isEdit ? (
                  <UButton
                      text='SAVE'
                      color='primary'
                      onClick={handleSave} />
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
                           fieldID={"projectName"}
                           fieldValue={project?.projectName}
                           placeholder={project?.projectName || 'example project name'}
                           onChange={handleInputChange}
            />

            <EditableField isEdit={isEdit}
                           isAdding={isAdding}
                           fieldName={"Section name:"}
                           fieldID={"Section name"}
                           fieldValue={project?.["Section name"]}
                           modalAction = {openSectionsModal}
            />

            { isOpenSectionsModal && isEdit
            && (<FindSection
                isOpen={isOpenSectionsModal}
                handleClose={closeSectionsModal}
                onSectionSelection={handleSectionSelection}/>)}

            <EditableField isEdit={isEdit}
                           fieldName={"URL:"}
                           fieldID={"projectUrl"}
                           fieldValue={project?.projectUrl}
                           placeholder={project?.projectUrl || 'http://example.project.url'}
                           onChange={handleInputChange}
            />

            <EditableField isEdit={isEdit}
                           fieldName={"Description:"}
                           fieldID={"description"}
                           fieldValue={project?.description}
                           placeholder={project?.description || 'Some example description'}
                           onChange={handleInputChange}
                           textArea={true}
            />

          </form>
        </Box>
      </ThemeProvider>
  );
};

export default ManageReferenceProject;
