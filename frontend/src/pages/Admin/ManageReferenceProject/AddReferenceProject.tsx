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
  const history = useHistory()

  const [isAdding, setIsAdding] = useState(true)
  const [project, setProject] = useState<InputValues>(initialValues)
  const { showError } = useSnackbar()
  const {
    mutate: addProject,
    status: queryStatus,
    error,
    data: queryResult,
  } = useCreateProject()

  useEffect(() => {
    if (queryStatus === 'success' && queryResult) {
      history.push(`/projects/${queryResult.data._id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStatus])

  function handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const name = target.id
    let value: string | number = target.value
    if (name === 'sectionId') {
      value = parseInt(value, 10)
    }
    setProject({
      ...project,
      [name]: value,
    })
  }

  async function handleSave() {
    addProject(project)
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
            fieldValue={project.projectName}
            placeholder={project.projectName || 'example project name'}
            onChange={handleInputChange}
          />

          <EditableField
            isEdit={true}
            isAdding={isAdding}
            fieldName={'Section name:'}
            fieldID={project.sectionName}
            fieldValue={project.sectionName}
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
            fieldValue={project.projectUrl}
            placeholder={project.projectUrl || 'http://example.project.url'}
            onChange={handleInputChange}
          />

          <EditableField
            isEdit={true}
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
