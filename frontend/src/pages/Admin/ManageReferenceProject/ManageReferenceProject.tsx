import React, { useEffect, useState } from 'react'
import { Box, LinearProgress } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { useHistory, useParams } from 'react-router-dom'

import FindSection from '../../../components/FindProject'
import EditableField from '../../../components/EditableField'
import UButton from '../../../components/UButton'

import { mainTheme } from '../../../theme/customMaterialTheme'
import styles from './ManageReferenceProject.module.css'
import PageHeader from '../../../components/PageHeader'
import DeleteButton from '../../../components/DeleteButton'
import useSnackbar from '../../../hooks/useSnackbar'
import ReusableGoBack from '../../../components/ReusableGoBack'
import {
  useUpdateProject,
  useDeleteProject,
  useCreateProject,
} from '../../../hooks'
import useProject from '../../../hooks/useQuery/useProject'

export interface ManageReferenceProjectProps {}

const ManageReferenceProject = (props: any) => {
  const { projectID } = useParams()
  const history = useHistory()
  // const projectID = props?.match?.params?.projectID

  const [isEdit, setIsEdit] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [project, setProject] = useState<any>()
  const { showError } = useSnackbar()
  const { mutate: updateProject } = useUpdateProject()
  const { mutate: deleteProject } = useDeleteProject()
  const { mutate: addProject } = useCreateProject()
  const { data: fetchedProject, error, isLoading } = useProject(projectID)

  console.log('proj', fetchedProject)

  useEffect(() => {
    if (props?.match?.path?.match('add')) {
      setIsAdding(true)
      setIsEdit(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setProject(fetchedProject)
  }, [fetchedProject])

  function toggleEdit() {
    setIsEdit(!isEdit)
  }

  function handleInputChange(event: any) {
    const target = event.target
    const name = target.id
    let value = target.value
    if (name === 'sectionId') value = parseInt(value, 10)
    // @ts-ignore
    setProject({
      ...project,
      [name]: value,
    })
  }

  function handleSave() {
    if (isAdding) {
      addProject(project)
      setIsAdding(false)
    } else {
      updateProject(project)
    }
    toggleEdit()
  }

  function handleDelete() {
    if (!isAdding) {
      deleteProject(project._id)
    }

    history.push('/projects')
  }

  const [isOpenSectionsModal, setIsOpenSectionsModal] = useState(false)

  function openSectionsModal() {
    setIsOpenSectionsModal(true)
  }
  function closeSectionsModal() {
    setIsOpenSectionsModal(false)
  }

  function handleSectionSelection(sectionID: string, sectionName: string) {
    closeSectionsModal()
    setProject({
      ...project,
      sectionId: sectionID,
      'Section name': sectionName,
    })
  }

  if (error) showError((error as Error).message)

  if (isLoading) return <LinearProgress />

  return (
    <ThemeProvider theme={mainTheme}>
      <PageHeader>
        <ReusableGoBack
          pageName="Projects"
          elementName={project?.projectName}
        />
      </PageHeader>

      <Box className={styles.container}>
        <Box display="flex" className={styles.container__header}>
          <span>Manage project</span>
          <div className={styles.container__header__button}>
            <DeleteButton
              confirmTitle="Are you sure you want to delete the project?"
              onConfirm={handleDelete}
            />
            {isEdit ? (
              <UButton text="SAVE" color="primary" onClick={handleSave} />
            ) : (
              <UButton text="EDIT" color="primary" onClick={toggleEdit} />
            )}
          </div>
        </Box>
        <form className={`${styles.manageForm} ${styles.container__body}`}>
          <EditableField
            isEdit={isEdit}
            fieldName={'Name:'}
            fieldID={'projectName'}
            fieldValue={project?.projectName}
            placeholder={project?.projectName || 'example project name'}
            onChange={handleInputChange}
          />

          <EditableField
            isEdit={isEdit}
            isAdding={isAdding}
            fieldName={'Section name:'}
            fieldID={'Section name'}
            fieldValue={project?.sectionId.name}
            modalAction={openSectionsModal}
          />

          {isOpenSectionsModal && isEdit && (
            <FindSection
              isOpen={isOpenSectionsModal}
              handleClose={closeSectionsModal}
              onSectionSelection={handleSectionSelection}
            />
          )}

          <EditableField
            isEdit={isEdit}
            fieldName={'URL:'}
            fieldID={'projectUrl'}
            fieldValue={project?.projectUrl}
            placeholder={project?.projectUrl || 'http://example.project.url'}
            onChange={handleInputChange}
          />

          <EditableField
            isEdit={isEdit}
            fieldName={'Description:'}
            fieldID={'description'}
            fieldValue={project?.description}
            placeholder={project?.description || 'Some example description'}
            onChange={handleInputChange}
            textArea={true}
          />
        </form>
      </Box>
    </ThemeProvider>
  )
}

export default ManageReferenceProject
