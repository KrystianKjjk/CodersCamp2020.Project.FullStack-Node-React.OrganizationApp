import React, { useEffect, useState } from 'react'
import styles from './TeamProject.module.css'
import { Button } from '@material-ui/core'
import {
  selectTeamProjects,
  getProjectById,
  saveProjectById,
  deleteProjectById,
  saveProjectSectionById,
  switchEditMode,
  switchDeleteMode,
  switchSectionSelectionMode,
  projectOperationSuccess,
  initialProjectState,
} from './TeamProjectSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import FindSection from '../../../components/FindSection/index'

export interface TeamProjectProps {
  _id: string //id projektu wybranego w tabeli
  changeViewFn: Function
}

interface deleteModalProps {
  projectDeleteMode: boolean
  _id: string
}

interface referenceProjectButtonProps {
  teamProject: String
}

const TeamProject: React.FC<TeamProjectProps> = (props) => {
  const { projectEditMode, projectDeleteMode, project } = useAppSelector(
    selectTeamProjects,
  )
  let selectedTeamProject = project
  const changeView = props.changeViewFn

  const dispatch = useAppDispatch()
  const [projectName, setProjectName] = useState(project.projectName)
  const [projectUrl, setProjectUrl] = useState(project.projectUrl)
  const [projectDescription, setProjectDescription] = useState(
    project.description,
  )
  const [referenceProjectName, setReferenceProjectName] = useState(
    project.referenceProjectName,
  )
  const [sectionName, setSectionName] = useState(project.sectionName)

  const [isOpenSectionsModal, setIsOpenSectionsModal] = useState(false)
  function closeSectionsModal() {
    setIsOpenSectionsModal(false)
  }
  function openSectionsModal() {
    setIsOpenSectionsModal(true)
  }

  useEffect(() => {
    dispatch(getProjectById(props._id))
    return () => {
      dispatch(projectOperationSuccess(initialProjectState))
    }
  }, [dispatch, props._id])

  useEffect(() => {
    setProjectName(project.projectName)
    setProjectUrl(project.projectUrl)
    setProjectDescription(project.description)
    setReferenceProjectName(project.referenceProjectName)
    setSectionName(project.sectionName)
  }, [
    project.description,
    project.projectName,
    project.projectUrl,
    project.referenceProjectName,
    project.sectionName,
    projectEditMode,
  ])

  const DeleteModal = (props: deleteModalProps) => {
    const projectDeleteMode = props.projectDeleteMode
    if (projectDeleteMode) {
      return (
        <div
          className={styles.modal}
          onClick={() => dispatch(switchDeleteMode())}
        >
          Do you really want to delete this project?
          <br />
          <br />
          <Button
            id={styles.buttonDelete}
            onClick={() => {
              dispatch(deleteProjectById(props._id))
              changeView()
            }}
          >
            Delete
          </Button>
        </div>
      )
    }
    return null
  }

  const handleSave = async () => {
    const newProjectData = {
      ...project,
      teamId: project.teamId,
      projectName: projectName,
      projectUrl: projectUrl,
      description: projectDescription,
    }
    await dispatch(saveProjectById(newProjectData, props._id))
    dispatch(getProjectById(props._id))
  }

  const handleChange = (
    setState: Function,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setState(e.target.value)
  }

  const ReferenceProjectButtonText = (props: referenceProjectButtonProps) => {
    if (props.teamProject) return <span>Change</span>
    return <span>Set</span>
  }

  return projectEditMode ? (
    <div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>
          Manage team project
        </span>
        <Button id={styles.buttonEdit} onClick={() => handleSave()}>
          Save
        </Button>
      </div>

      <div className={styles.teamProjectDetailsContainer}>
        <div className={styles.attributeNamesContainer}>
          <div>Name:</div>
          <div>Reference project:</div>
          <div>Team mentor:</div>
          <div>Section name:</div>
          <div>Project URL:</div>
          <div>Description:</div>
        </div>
        <div className={styles.attributeValuesContainer}>
          <div>
            <input
              className={styles.input}
              defaultValue={selectedTeamProject!.projectName}
              onChange={(e) => handleChange(setProjectName, e)}
            ></input>
          </div>
          <div>{referenceProjectName}</div>
          <div>{selectedTeamProject!.mentor}</div>
          <div>
            {sectionName}
            <Button
              id={styles.buttonEdit}
              onClick={() => {
                openSectionsModal()
                switchSectionSelectionMode()
              }}
            >
              <ReferenceProjectButtonText
                teamProject={selectedTeamProject!.referenceProjectName}
              />
            </Button>
          </div>
          <div>
            <input
              className={styles.input}
              defaultValue={selectedTeamProject!.projectUrl}
              onChange={(e) => handleChange(setProjectUrl, e)}
            ></input>
          </div>
          <div>
            <textarea
              className={styles.textarea}
              defaultValue={selectedTeamProject!.description}
              onChange={(e) => handleChange(setProjectDescription, e)}
            ></textarea>
          </div>
        </div>
      </div>

      <FindSection
        onSectionSelection={async (sectionID: string) => {
          const [projectName, sectionName] = await dispatch(
            saveProjectSectionById(selectedTeamProject, sectionID),
          )
          setReferenceProjectName(projectName)
          setSectionName(sectionName)
          closeSectionsModal()
        }}
        //@ts-ignore
        isOpen={isOpenSectionsModal}
        handleClose={closeSectionsModal}
      />
    </div>
  ) : (
    <div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>
          Manage team project
        </span>
        <Button
          id={styles.buttonDelete}
          onClick={() => dispatch(switchDeleteMode())}
        >
          Delete
        </Button>
        <Button
          id={styles.buttonEdit}
          onClick={() => dispatch(switchEditMode())}
        >
          Edit
        </Button>
        <Button id={styles.buttonEdit} onClick={() => props.changeViewFn()}>
          Back
        </Button>
      </div>

      <div className={styles.teamProjectDetailsContainer}>
        <div className={styles.attributeNamesContainer}>
          <div>Name:</div>
          <div>Reference project:</div>
          <div>Team mentor:</div>
          <div>Section name:</div>
          <div>Project URL:</div>
          <div>Description:</div>
        </div>
        <div className={styles.attributeValuesContainer}>
          <div>{selectedTeamProject!.projectName}</div>
          <div>{selectedTeamProject!.referenceProjectName}</div>
          <div>{selectedTeamProject!.mentor}</div>
          <div>{selectedTeamProject!.sectionName}</div>
          <div>{selectedTeamProject!.projectUrl}</div>
          <div className={styles.description}>
            {selectedTeamProject!.description}
          </div>
        </div>
      </div>
      <DeleteModal
        projectDeleteMode={projectDeleteMode}
        _id={selectedTeamProject._id}
      />
    </div>
  )
}

export default TeamProject
