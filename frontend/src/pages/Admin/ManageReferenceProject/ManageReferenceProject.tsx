import React, { useEffect, useState } from 'react'
import { Box, LinearProgress } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'

import FindProject from '../../../components/FindProject'
import EditableField from '../../../components/EditableField'
import UButton from '../../../components/UButton'

import styles from './ManageReferenceProject.module.css'
import DeleteButton from '../../../components/DeleteButton'
import useSnackbar from '../../../hooks/useSnackbar'
import { useUpdateProject, useDeleteProject } from '../../../hooks'
import useProject from '../../../hooks/useQuery/useProject'
import DetailPage from '../../../components/DetailPage'

import { SectionDataFromSelection, InputValues } from './types'

export interface ManageReferenceProjectProps {}

const initialValues: InputValues = {
  _id: '',
  description: '',
  projectName: '',
  projectUrl: '',
  sectionId: '',
  sectionName: '',
}

const ManageReferenceProject = (props: any) => {
  const { projectID } = useParams<{ projectID: string }>()
  const history = useHistory()

  const [isEdit, setIsEdit] = useState(false)
  const [project, setProject] = useState<InputValues>(initialValues)
  const { showError } = useSnackbar()
  const { mutate: updateProject } = useUpdateProject()
  const { mutate: deleteProject } = useDeleteProject()
  const { data: fetchedProject, error, isLoading } = useProject(projectID)

  useEffect(() => {
    if (fetchedProject && fetchedProject.sectionId) {
      setProject({
        _id: fetchedProject._id,
        description: fetchedProject.description,
        projectName: fetchedProject.projectName,
        projectUrl: fetchedProject.projectUrl,
        sectionId: fetchedProject.sectionId._id,
        sectionName: fetchedProject.sectionId.name,
      })
    }
  }, [fetchedProject])

  function toggleEdit() {
    setIsEdit(!isEdit)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const name = target.id
    let value: string | number = target.value
    if (name === 'sectionId') value = parseInt(value, 10)
    setProject({
      ...project,
      [name]: value,
    })
  }

  function handleSave() {
    updateProject(project)
    toggleEdit()
  }

  function handleDelete() {
    deleteProject(projectID)
    history.push('/projects')
  }

  const [isOpenSectionsModal, setIsOpenSectionsModal] = useState(false)

  function openSectionsModal() {
    setIsOpenSectionsModal(true)
  }
  function closeSectionsModal() {
    setIsOpenSectionsModal(false)
  }

  function handleSectionSelection({
    id,
    sectionName,
  }: SectionDataFromSelection) {
    closeSectionsModal()
    setProject({
      ...project,
      sectionId: id,
      sectionName,
    })
  }

  if (error) showError((error as Error).message)

  if (isLoading) return <LinearProgress />

  return (
    <DetailPage pageName={'Projects'} elementName={project?.projectName}>
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
            fieldValue={project.projectName}
            placeholder={project.projectName || 'example project name'}
            onChange={handleInputChange}
          />

          <EditableField
            isEdit={isEdit}
            isAdding={false}
            fieldName={'Section name:'}
            fieldID={project.sectionName}
            fieldValue={project.sectionName}
            modalAction={openSectionsModal}
          />

          {/* // *TODO create component that displays sections without assigned projects */}
          {isOpenSectionsModal && isEdit && (
            <FindProject
              isOpen={isOpenSectionsModal}
              handleClose={closeSectionsModal}
              onSectionSelection={handleSectionSelection}
            />
          )}

          <EditableField
            isEdit={isEdit}
            fieldName={'URL:'}
            fieldID={'projectUrl'}
            fieldValue={project.projectUrl}
            placeholder={project.projectUrl || 'http://example.project.url'}
            onChange={handleInputChange}
          />

          <EditableField
            isEdit={isEdit}
            fieldName={'Description:'}
            fieldID={'description'}
            fieldValue={project.description}
            placeholder={project.description || 'Some example description'}
            onChange={handleInputChange}
            textArea={true}
          />
        </form>
      </Box>
    </DetailPage>
  )
}

export default ManageReferenceProject
