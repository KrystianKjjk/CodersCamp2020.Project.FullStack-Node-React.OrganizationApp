import React, { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@material-ui/core'

import { IGrade } from '../../../models/User.model'
import UButton from '../../../components/UButton'

import styles from './ManageGrades.module.css'
import DeleteButton from '../../../components/DeleteButton'
import useSnackbar from '../../../hooks/useSnackbar'
import {
  useCreateGrade,
  useDeleteGrade,
  useGrades,
  useSections,
  useUpdateGrade,
} from '../../../hooks'
import { Section } from '../../../models'
import FindModal from '../../../components/FindModal/FindModal'

export interface ManageGradesProps {
  userID: string
}

export interface ISectionsUtility {
  _id: string
  name?: string
}

const ManageGrades: React.FC<ManageGradesProps> = (props) => {
  const [isEdit, setIsEdit] = useState<Array<boolean>>([])

  const [grades, setGrades] = useState<IGrade[]>([])
  const [sections, setSections] = useState<ISectionsUtility[]>([])

  const [isOpenSectionsModal, setIsOpenSectionsModal] = useState(false)
  const { showError, showWarning } = useSnackbar()
  const { data: gradesData, isLoading, error } = useGrades(props.userID)
  const sectionsQuery = useSections({
    enabled: isOpenSectionsModal,
  })
  const { mutate: createGrade } = useCreateGrade(props.userID)
  const { mutate: deleteGrade } = useDeleteGrade()
  const { mutate: updateGrade } = useUpdateGrade()

  const sectionColumns = [
    { field: 'name', headerName: 'Section name', width: 150, sortable: true },
  ]

  useEffect(() => {
    gradesData?.grades && setGrades(gradesData.grades)
    gradesData?.sections && setSections(gradesData.sections)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradesData])

  function toggleEdit(index: number) {
    let edits = [...isEdit]
    edits[index] = !edits[index]
    setIsEdit([...edits])
  }

  function openSectionsModal() {
    setIsOpenSectionsModal(true)
  }
  function closeSectionsModal() {
    setIsOpenSectionsModal(false)
  }

  function handleInputChangeGrade(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target
    const index = target.tabIndex
    const name = target.name
    const value = +target.value

    const tmpGrades: IGrade[] = [...((grades ?? []) as IGrade[])]
    const grade = tmpGrades[index]
    // @ts-ignore
    grade[name] = +value
    tmpGrades[index] = grade
    setGrades(tmpGrades)
  }

  function onClickDelete(index: number) {
    if (gradesData?.grades[index]) {
      deleteGrade(gradesData?.grades[index]?._id)
      toggleEdit(index)
    }
  }

  function saveGrade(index: number) {
    try {
      if (gradesData?.grades[index]) {
        updateGrade([gradesData?.grades[index], gradesData.grades[index]])
      } else {
        console.log(grades![index])
        createGrade(grades![index])
      }
      toggleEdit(index)
    } catch (err) {
      if (err?.response?.data?.message.match('sectionId'))
        showWarning('Section must be selected.')
    }
  }

  function addGrade(event: any) {
    const idx = grades.length
    const tmpGrade: Omit<IGrade, '_id'> = {
      sectionId: '',
      testPoints: 0,
      testMaxPoints: 0,
      taskPoints: 0,
      taskMaxPoints: 0,
      projectPoints: 0,
    }
    //@ts-ignore
    setGrades([...grades, tmpGrade])
    setSections([...sections, { _id: 'exampleID' }])

    toggleEdit(idx)
  }

  function handleSectionSelection(index: number) {
    return function onSectionSelection(sectionRow: Section) {
      closeSectionsModal()
      const tmpGrades = [...grades]
      tmpGrades[index].sectionId = sectionRow.id
      setGrades([...tmpGrades])

      console.log({ sections })
      console.log({ grades })
      const tmpSections = [...sections]
      tmpSections[index].name = sectionRow.name
      setSections([...tmpSections])
    }
  }

  if (error) showError((error as Error).message)

  if (isLoading) return <CircularProgress className={styles.loading} />

  return (
    <Box className={styles.container}>
      <Box display="flex" className={styles.container__header}>
        <span>Manage Grades</span>
        <UButton text="ADD" color="primary" onClick={addGrade} />
      </Box>
      <Box display="flex" flexWrap="wrap">
        {grades?.map((grade, index) => (
          <div className={styles.gradeContainer} key={index}>
            {isOpenSectionsModal && isEdit[index] && (
              <FindModal<Section>
                onRowSelection={handleSectionSelection(index)}
                query={sectionsQuery}
                queryKey="sections"
                columns={sectionColumns}
                searchPlaceholder="Search by name"
                searchBy="name"
                name="Find section"
                open={isOpenSectionsModal}
                handleClose={closeSectionsModal}
                handleOpen={() => setIsOpenSectionsModal(true)}
              />
            )}

            <div className={styles.gradeContainer__header}>
              <span>{sections[index]?.name ?? 'Section Name'}</span>
              {isEdit[index] && grades[index]?.sectionId === '' && (
                <UButton
                  text="SELECT"
                  color="primary"
                  onClick={openSectionsModal}
                />
              )}
              {isEdit[index] && grades[index]?.sectionId !== '' && (
                <UButton
                  text="CHANGE"
                  color="primary"
                  onClick={openSectionsModal}
                />
              )}
            </div>

            <form className={`${styles.gradeContainer__body}`}>
              <div className={styles.gradeContainer__body__row}>
                <div className={styles.gradeContainer__body__row__key}>
                  <label htmlFor="test">Test</label>
                </div>
                <div className={`${styles.gradeContainer__body__row__value}`}>
                  {isEdit[index] ? (
                    <div>
                      <input
                        type="text"
                        tabIndex={index}
                        name="testPoints"
                        placeholder={grade?.testPoints?.toString()}
                        onChange={handleInputChangeGrade}
                      />
                      <input
                        type="text"
                        tabIndex={index}
                        name="testMaxPoints"
                        placeholder={grade?.testMaxPoints?.toString()}
                        onChange={handleInputChangeGrade}
                      />
                    </div>
                  ) : (
                    <p>
                      {Math.round(
                        grade?.testMaxPoints === 0
                          ? 0
                          : (grade.testPoints / grade.testMaxPoints) * 100,
                      )}
                      %
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.gradeContainer__body__row}>
                <div className={styles.gradeContainer__body__row__key}>
                  <label htmlFor="test">Task</label>
                </div>
                <div className={`${styles.gradeContainer__body__row__value}`}>
                  {isEdit[index] ? (
                    <div>
                      <input
                        type="text"
                        tabIndex={index}
                        name="taskPoints"
                        placeholder={grade?.taskPoints?.toString()}
                        onChange={handleInputChangeGrade}
                      />
                      <input
                        type="text"
                        tabIndex={index}
                        name="taskMaxPoints"
                        placeholder={grade?.taskMaxPoints?.toString()}
                        onChange={handleInputChangeGrade}
                      />
                    </div>
                  ) : (
                    <p>
                      {Math.round(
                        grade.taskMaxPoints === 0
                          ? 0
                          : (grade.taskPoints / grade.taskMaxPoints) * 100,
                      )}
                      %
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.gradeContainer__body__row}>
                <div className={styles.gradeContainer__body__row__key}>
                  <label htmlFor="test">Project</label>
                </div>
                <div className={`${styles.gradeContainer__body__row__value}`}>
                  <div>
                    {isEdit[index] ? (
                      <input
                        type="text"
                        tabIndex={index}
                        name="projectPoints"
                        placeholder={grade?.projectPoints?.toString()}
                        onChange={handleInputChangeGrade}
                      />
                    ) : (
                      <p>{grade?.projectPoints}pkt</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <Box display="flex" justifyContent="center">
              <DeleteButton
                confirmTitle="Are you sure you want to delete this grade? XX"
                onConfirm={() => onClickDelete(index)}
              />

              {isEdit[index] ? (
                <UButton text="SAVE" onClick={() => saveGrade(index)} />
              ) : (
                <UButton text="EDIT" onClick={() => toggleEdit(index)} />
              )}
            </Box>
          </div>
        ))}
      </Box>
    </Box>
  )
}

export default ManageGrades
