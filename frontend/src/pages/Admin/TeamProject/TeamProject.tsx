import React, { useState } from 'react'
import styles from './TeamProject.module.css'
import { Button } from '@material-ui/core'
import {
  selectTeamProjects,
  getProjectById,
  saveProjectById,
  deleteProjectById,
  saveProjectSectionById,
  switchEditMode,
  switchSectionSelectionMode,
} from './TeamProjectSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import FindSection from '../../../components/FindSection/index'
import DeleteButton from '../../../components/DeleteButton'
import { useParams } from 'react-router-dom'
import PageHeader from '../../../components/PageHeader'
import ReusableGoBack from '../../../components/ReusableGoBack'
import { useTeamProject } from '../../../hooks/useQuery/useTeamProjects'

export interface TeamProjectProps {}

interface referenceProjectButtonProps {
  teamProject: String
}

const TeamProject: React.FC<TeamProjectProps> = () => {
  const { teamProjectId } = useParams()
  const { isLoading, isError, data } = useTeamProject(teamProjectId)

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

  const handleSave = async () => {
    const newProjectData = {
      ...project,
      teamId: project.teamId,
      projectName: projectName,
      projectUrl: projectUrl,
      description: projectDescription,
    }
    await dispatch(saveProjectById(newProjectData, teamProjectId))
    dispatch(getProjectById(teamProjectId))
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
  let component: JSX.Element
  if (isLoading) return <div> loading...</div>
  if (isError) return <div> Error...</div>
  if (!data) return <div>Error </div>

  if (projectEditMode)
    component = (
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
                defaultValue={selectedTeamProject?.projectName}
                onChange={(e) => handleChange(setProjectName, e)}
              ></input>
            </div>
            <div>{referenceProjectName}</div>
            <div>{selectedTeamProject?.mentor}</div>
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
                  teamProject={selectedTeamProject?.referenceProjectName}
                />
              </Button>
            </div>
            <div>
              <input
                className={styles.input}
                defaultValue={selectedTeamProject?.projectUrl}
                onChange={(e) => handleChange(setProjectUrl, e)}
              ></input>
            </div>
            <div>
              <textarea
                className={styles.textarea}
                defaultValue={selectedTeamProject?.description}
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
    )

  component = (
    <div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>
          Manage team project
        </span>
        <DeleteButton
          confirmTitle="o you really want to delete this project?"
          onConfirm={() => {
            dispatch(deleteProjectById(teamProjectId))
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
          <div>{data?.projectName}</div>
          <div>{data?.parentProjectId?.projectName}</div>
          <div>
            {data?.teamId?.mentor?.name} {data?.teamId?.mentor?.name}
          </div>
          <div>{data?.parentProjectId?.sectionId?.name}</div>
          <div>{data?.projectUrl}</div>
          <div className={styles.description}>{data?.description}</div>
        </div>
      </div>
    </div>
  )
  return (
    <div>
      <PageHeader>
        <ReusableGoBack
          pageName={'Team Projects'}
          pageLink={'/teamprojects'}
          elementName={`'example to change`}
        />
      </PageHeader>
      {component}
    </div>
  )
}

export default TeamProject
