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
import DeleteButton from '../../../components/DeleteButton'
import { useParams } from 'react-router-dom'

export interface TeamProjectProps {}

interface referenceProjectButtonProps {
  teamProject: String
}

const TeamProject: React.FC<TeamProjectProps> = () => {
  const { id } = useParams()
  console.log('temID', id)

  const { projectEditMode, project } = useAppSelector(selectTeamProjects)
  let selectedTeamProject = project

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
    dispatch(getProjectById(id))
    return () => {
      dispatch(projectOperationSuccess(initialProjectState))
    }
  }, [dispatch, id])

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

  const handleSave = async () => {
    const newProjectData = {
      ...project,
      teamId: project.teamId,
      projectName: projectName,
      projectUrl: projectUrl,
      description: projectDescription,
    }
    await dispatch(saveProjectById(newProjectData, id))
    dispatch(getProjectById(id))
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
        <DeleteButton
          confirmTitle="o you really want to delete this project?"
          onConfirm={() => {
            dispatch(deleteProjectById(id))
          }}
        />
        <Button
          id={styles.buttonEdit}
          onClick={() => dispatch(switchEditMode())}
        >
          Edit
        </Button>
        <Button id={styles.buttonEdit} onClick={() => {}}>
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
    </div>
  )
}

export default TeamProject
