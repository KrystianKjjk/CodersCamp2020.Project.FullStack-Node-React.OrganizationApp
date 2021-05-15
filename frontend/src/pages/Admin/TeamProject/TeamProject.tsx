import React, { useState, useEffect } from 'react'
import styles from './TeamProject.module.css'
import { selectTeamProjects, switchEditMode } from './TeamProjectSlice'
import { useAppSelector } from '../../../hooks/hooks'
import FindProject from '../../../components/FindProject'
import DeleteButton from '../../../components/DeleteButton'
import { useParams } from 'react-router-dom'
import PageHeader from '../../../components/PageHeader'
import ReusableGoBack from '../../../components/ReusableGoBack'
import {
  useTeamProject,
  useDeleteTeamProject,
  useUpdateTeamProject,
} from '../../../hooks/useQuery/useTeamProjects'
import { TeamProjectDetails } from '../../../api/TeamProjects.api'
import UButton from '../../../components/UButton'
import { useDispatch } from 'react-redux'
import NameValuePair from '../../../components/NameValuePair'
import ConfirmButton from '../../../components/ConfirmButton'

export interface TeamProjectProps {}

const TeamProject: React.FC<TeamProjectProps> = () => {
  const { teamProjectId } = useParams()
  const [headerName, setHeaderName] = useState(teamProjectId)

  return (
    <DetailPage pageName={'Team Projects'} elementName={headerName}>
      <TeamProjectContent
        teamProjectId={teamProjectId}
        setHeader={setHeaderName}
      />
    </DetailPage>
  )
}

interface DetailPageProps {
  pageName: string
  elementName: string
}
const DetailPage: React.FC<DetailPageProps> = ({ children, ...restProps }) => {
  return (
    <div>
      <PageHeader>
        <ReusableGoBack {...restProps} />
      </PageHeader>
      {children}
    </div>
  )
}
export default TeamProject

const TeamProjectContent = ({
  teamProjectId,
  setHeader,
}: {
  teamProjectId: string
  setHeader: Function
}) => {
  const { isLoading, isError, data } = useTeamProject(teamProjectId)
  useEffect(() => {
    setHeader(data?.projectName ?? teamProjectId)
  }, [data, setHeader, teamProjectId])

  const { projectEditMode } = useAppSelector(selectTeamProjects)

  if (isLoading) return <div> loading...</div>
  if (isError) return <div> Error...</div>
  if (!data) return <div>Error </div>

  if (projectEditMode) return <TeamProjectDetailsEdit {...data} />

  return <TeamProjectDetailView {...data} />
}

const TeamProjectDetailsEdit = (props: TeamProjectDetails) => {
  const dispatch = useDispatch()
  const deleteRequest = useDeleteTeamProject(() => dispatch(switchEditMode()))
  const updateRequest = useUpdateTeamProject(() => dispatch(switchEditMode()))

  const [projectName, setProjectName] = useState(props.projectName)
  const [projectUrl, setProjectUrl] = useState(props.projectUrl)
  const [description, setProjectDescription] = useState(props.description)
  const [project] = useState(props?.parentProjectId)

  const [isOpenSectionsModal, setIsOpenSectionsModal] = useState(false)
  function closeSectionsModal() {
    setIsOpenSectionsModal(false)
  }
  function openSectionsModal() {
    setIsOpenSectionsModal(true)
  }

  const mentorName = `${props.teamId?.mentor.name ?? ''} ${
    props.teamId?.mentor.surname ?? ''
  }`

  return (
    <div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>
          Manage team project
        </span>

        <ConfirmButton
          text={'Cancel'}
          confirmTitle="Implemented changes will be abandoned"
          confirmContent="Are u sure?"
          onConfirm={() => {
            dispatch(switchEditMode())
          }}
        />
        <DeleteButton
          confirmTitle="Do you really want to delete this project?"
          onConfirm={() => {
            deleteRequest(props._id)
          }}
        />

        <UButton
          text={'Save'}
          onClick={() => {
            updateRequest({
              _id: props._id,
              teamId: props.teamId?._id,
              projectName,
              projectUrl,
              description,
              parentProjectId: project?._id,
            })
          }}
        />
      </div>
      <div className={styles.teamProjectDetailsContainer}>
        <NameValuePair name={'Name:'}>
          <input
            className={styles.input}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </NameValuePair>
        <NameValuePair name={'Reference project:'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>{project?.projectName ?? ''}</p>
            <UButton
              text={'change project/section'}
              onClick={() => {
                openSectionsModal()
              }}
            >
              {/* <ReferenceProjectButtonText
                teamProject={props.parentProjectId?.projectName ?? ''}
              /> */}
            </UButton>
          </div>
        </NameValuePair>
        <NameValuePair name={'Team mentor:'}>
          <p>{mentorName}</p>
        </NameValuePair>
        <NameValuePair name={'Section name:'}>
          <p>{project?.sectionId?.name ?? ''}</p>
        </NameValuePair>
        <NameValuePair name={'Project URL:'}>
          <input
            className={styles.input}
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
          ></input>
        </NameValuePair>
        <NameValuePair name={'Description:'}>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </NameValuePair>
      </div>

      <FindProject
        selectedProjectId={project?._id}
        onSectionSelection={async () => {
          //setParentProjectId(sectionId)
          //const [projectName, sectionName] =
          //await dispatch(
          // saveProjectSectionById(props, sectionID),
          //)
          // setReferenceProjectName(projectName)
          // setSectionName(sectionName)
          // closeSectionsModal()
        }}
        //@ts-ignore
        isOpen={isOpenSectionsModal}
        handleClose={closeSectionsModal}
      />
    </div>
  )
}

const TeamProjectDetailView = (props: TeamProjectDetails) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.teamProjectContainer}>
      <div className={styles.teamProjectHeader}>
        <span className={styles.teamProjectHeaderName}>
          Manage team project
        </span>
        <UButton text={'Edit'} onClick={() => dispatch(switchEditMode())} />
      </div>

      <div className={styles.teamProjectDetailsContainer}>
        <NameValuePair name={'Name:'}>
          <p>{props?.projectName}</p>
        </NameValuePair>
        <NameValuePair name={'Reference project:'}>
          <p>{props?.parentProjectId?.projectName}</p>
        </NameValuePair>
        <NameValuePair name={'Team mentor:'}>
          <p>
            {props?.teamId?.mentor?.name} {props?.teamId?.mentor?.surname}
          </p>
        </NameValuePair>
        <NameValuePair name={'Section name:'}>
          <p>{props?.parentProjectId?.sectionId?.name}</p>
        </NameValuePair>
        <NameValuePair name={'Project URL:'}>
          <p>{props?.projectUrl}</p>
        </NameValuePair>
        <NameValuePair name={'Description:'}>
          <p>{props?.description}</p>
        </NameValuePair>
      </div>
    </div>
  )
}
