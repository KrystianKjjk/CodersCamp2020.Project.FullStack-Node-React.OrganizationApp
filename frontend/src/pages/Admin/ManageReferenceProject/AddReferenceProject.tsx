import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import FindProject from '../../../components/FindProject'
import EditableField from '../../../components/EditableField'
import UButton from '../../../components/UButton'

import styles from './ManageReferenceProject.module.css'
import DeleteButton from '../../../components/DeleteButton'
import useSnackbar from '../../../hooks/useSnackbar'
import { useCreateProject } from '../../../hooks'
import DetailPage from '../../../components/DetailPage'

export interface ManageReferenceProjectProps {}

const ManageReferenceProject = (props: any) => {
  const history = useHistory()

  const [isEdit, setIsEdit] = useState(true)
  const [isAdding, setIsAdding] = useState(true)
  const [project, setProject] = useState<any>()
  const { showError } = useSnackbar()
  const {
    mutate: addProject,
    status: queryStatus,
    error,
    data: queryResult,
  } = useCreateProject()

  useEffect(() => {
    if (queryStatus === 'success' && queryResult) {
      toggleEdit()
      history.push(`/projects/${queryResult.data._id}`)
    }
  }, [queryStatus])

  function toggleEdit() {
    setIsEdit(!isEdit)
  }

  function handleInputChange(event: any) {
    const target = event.target
    const name = target.id
    let value = target.value
    if (name === 'sectionId') {
      value = parseInt(value, 10)
    }
    // @ts-ignore
    setProject({
      ...project,
      [name]: value,
    })
  }

  async function handleSave() {
    addProject({ ...project, sectionId: project.sectionId.id })
  }

  function handleDelete() {
    history.push('/projects')
  }

  const [isOpenSectionsModal, setIsOpenSectionsModal] = useState(false)

  function openSectionsModal() {
    setIsOpenSectionsModal(true)
  }
  function closeSectionsModal() {
    setIsOpenSectionsModal(false)
  }

  function handleSectionSelection(sectionData: any) {
    console.log(sectionData)
    closeSectionsModal()
    setProject({
      ...project,
      sectionId: sectionData,
      'Section name': sectionData.sectionName,
    })
    setIsAdding(false)
  }

  if (error) showError((error as Error).message)

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
            <UButton text="SAVE" color="primary" onClick={handleSave} />
          </div>
        </Box>
        <form className={`${styles.manageForm} ${styles.container__body}`}>
          <EditableField
            isEdit={true}
            fieldName={'Name:'}
            fieldID={'projectName'}
            fieldValue={project?.projectName}
            placeholder={project?.projectName || 'example project name'}
            onChange={handleInputChange}
          />

          <EditableField
            isEdit={true}
            isAdding={isAdding}
            fieldName={'Section name'}
            fieldID={'Section name'}
            fieldValue={project?.sectionId?.sectionName}
            modalAction={openSectionsModal}
          />

          {isOpenSectionsModal && (
            <FindProject
              isOpen={isOpenSectionsModal}
              handleClose={closeSectionsModal}
              onSectionSelection={handleSectionSelection}
            />
          )}

          <EditableField
            isEdit={true}
            fieldName={'URL:'}
            fieldID={'projectUrl'}
            fieldValue={project?.projectUrl}
            placeholder={project?.projectUrl || 'http://example.project.url'}
            onChange={handleInputChange}
          />

          <EditableField
            isEdit={true}
            fieldName={'Description:'}
            fieldID={'description'}
            fieldValue={project?.description}
            placeholder={project?.description || 'Some example description'}
            onChange={handleInputChange}
            textArea={true}
          />
        </form>
      </Box>
    </DetailPage>
  )
}

export default ManageReferenceProject
