import React, { useEffect, useState } from 'react'
import { Box, LinearProgress } from '@material-ui/core'
import { match, useHistory, useParams } from 'react-router-dom'
import { GridValueFormatterParams } from '@material-ui/data-grid'

import EditableField from '../../../components/EditableField'
import UButton from '../../../components/UButton'
import DeleteButton from '../../../components/DeleteButton'
import useSnackbar from '../../../hooks/useSnackbar'
import {
  useUpdateProject,
  useDeleteProject,
  useCreateProject,
  useSections,
  useProjects,
  useProject,
} from '../../../hooks'
import DetailPage from '../../../components/DetailPage'
import { Section } from '../../../models'
import FindModal from '../../../components/FindModal'
import { displayFormattedDate } from '../../../api'

import { InputValues } from './types'
import styles from './ManageReferenceProject.module.css'

export interface ManageReferenceProjectProps {
  history: any
  location: Location
  match: match
}

const initialValues = {
  _id: '',
  description: '',
  projectName: '',
  projectUrl: '',
  sectionId: '',
  sectionName: '',
}

const ManageReferenceProject = (props: ManageReferenceProjectProps) => {
  const { projectID } = useParams<{ projectID: string }>()
  const history = useHistory()

  const [isEdit, setIsEdit] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [project, setProject] = useState<InputValues>(initialValues)
  const { showError } = useSnackbar()
  const {
    mutate: updateProject,
    isSuccess: isUpdatedSuccessfully,
  } = useUpdateProject()
  const { mutate: deleteProject } = useDeleteProject()
  const {
    mutate: addProject,
    isSuccess: isCreatedSuccessfully,
  } = useCreateProject()
  const { data: fetchedProject, error, isLoading } = useProject(projectID, {
    enabled: !!projectID,
  })
  useProjects()

  const [isOpenSectionsModal, setIsOpenSectionsModal] = useState(false)
  const sectionsQuery = useSections({
    enabled: isOpenSectionsModal,
  })

  useEffect(() => {
    if (props?.match?.path?.match('add')) {
      setIsAdding(true)
      setIsEdit(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isCreatedSuccessfully || isUpdatedSuccessfully) {
      history.push('/projects')
    }
  }, [isCreatedSuccessfully, isUpdatedSuccessfully, history])

  useEffect(() => {
    if (fetchedProject) {
      const { sectionId, id, ...project } = fetchedProject
      setProject({
        _id: id,
        sectionId,
        ...project,
      })
    }
  }, [fetchedProject])

  function toggleEdit() {
    setIsEdit(!isEdit)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, id: name } = event.currentTarget

    setProject({
      ...project,
      [name]: value,
    })
  }

  function handleSave() {
    const { _id, sectionName, ...queryData } = project
    if (isAdding) {
      addProject(queryData)
      setIsAdding(false)
    } else {
      updateProject({ ...queryData, _id })
    }
  }

  function handleDelete() {
    if (!isAdding) deleteProject(project._id)

    history.push('/projects')
  }

  function openSectionsModal() {
    setIsOpenSectionsModal(true)
  }
  function closeSectionsModal() {
    setIsOpenSectionsModal(false)
  }

  function handleSectionSelection(section: Section) {
    closeSectionsModal()
    setProject({
      ...project,
      sectionId: section.id,
      sectionName: section.name,
    })
  }

  const sectionColumns = [
    { field: 'name', width: 200, headerName: 'section Name' },
    {
      field: 'startDate',
      width: 200,
      headerName: 'Start date',
      sortable: true,
      valueFormatter: (params: GridValueFormatterParams) =>
        displayFormattedDate(params.value as number),
    },
    {
      field: 'endDate',
      width: 200,
      headerName: 'End date',
      sortable: true,
      valueFormatter: (params: GridValueFormatterParams) =>
        displayFormattedDate(params.value as number),
    },
  ]

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
            isAdding={isAdding}
            fieldName={'Section name:'}
            fieldID={'Section name'}
            fieldValue={project.sectionName}
            modalAction={openSectionsModal}
          />

          {isOpenSectionsModal && isEdit && (
            <FindModal<Section>
              onRowSelection={handleSectionSelection}
              query={sectionsQuery}
              queryKey="sections"
              columns={sectionColumns}
              searchPlaceholder="Search by name"
              searchBy="name"
              name="Find section"
              open={isOpenSectionsModal}
              handleClose={() => setIsOpenSectionsModal(false)}
              handleOpen={() => setIsOpenSectionsModal(true)}
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
