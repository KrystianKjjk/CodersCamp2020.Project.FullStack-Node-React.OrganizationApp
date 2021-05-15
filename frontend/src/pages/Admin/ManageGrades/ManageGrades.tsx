import React, { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@material-ui/core'

import SectionsService from '../../../api/sections.service'
import BaseService from '../../../app/baseService'
import GradeService from '../../../api/grades.service'
import { IGrade } from '../../../models/User.model'
import UButton from '../../../components/UButton'
import FindSection from '../../../components/FindSection'

import styles from './ManageGrades.module.css'
import DeleteButton from '../../../components/DeleteButton'
import useSnackbar from '../../../hooks/useSnackbar'

export interface ManageGradesProps {
  userID: string
}

export interface ISectionsUtility {
  _id: string
  name?: string
}

const ManageGrades: React.FC<ManageGradesProps> = (props) => {
  const gradeService = new GradeService(new BaseService())
  const sectionService = new SectionsService(new BaseService())

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isEdit, setIsEdit] = useState<Array<boolean>>([])

  const [grades, setGrades] = useState<IGrade[]>([])
  const [sections, setSections] = useState<ISectionsUtility[]>([])

  const [isOpenSectionsModal, setIsOpenSectionsModal] = useState(false)
  const { showSuccess, showError, showWarning } = useSnackbar()

  useEffect(() => {
    getGrades(props.userID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

    const tmpGrades: IGrade[] = [...(grades as IGrade[])]
    const grade = tmpGrades[index]
    // @ts-ignore
    grade[name] = +value
    tmpGrades[index] = grade

    setGrades([...tmpGrades])
  }

  function getSectionNames(sections: ISectionsUtility[]) {
    const tmpSections: ISectionsUtility[] = [...sections]
    sections.forEach((section: ISectionsUtility, index: number) => {
      sectionService
        .getSectionByID(section?._id)
        .then((res) => {
          if (res.status === 200) {
            tmpSections[index] = { _id: res.data._id, name: res.data.name }
            setSections([...tmpSections])
          }
        })
        .catch((err) => {
          tmpSections[index] = { _id: section?._id, name: 'no section' }
          setSections([...tmpSections])
        })
    })
  }

  function getGrades(userID: string) {
    setIsLoaded(false)
    gradeService
      .getGrades(userID)
      .then((res) => {
        if (res.status === 200) {
          setIsLoaded(true)
          setGrades([...res.data])

          let tmpSections: ISectionsUtility[] = res.data.map(
            (grade: IGrade) => ({ _id: grade.sectionId }),
          )
          setSections([...tmpSections])
          getSectionNames(tmpSections)
        } else throw Error
      })
      .catch((err) => {
        setIsLoaded(true)
        setError(err)
      })
  }

  function deleteGrade(index: number) {
    if ('_id' in grades![index]) {
      gradeService
        .deleteGrade(grades![index]._id)
        .then((res) => {
          if (res.status === 200) {
            const tmpGrades = [...grades]
            tmpGrades.splice(index, 1)
            setGrades([...tmpGrades])
            const tmpSections = [...sections]
            tmpSections.splice(index, 1)
            setSections([...tmpSections])
            showSuccess('action finished successfully')
          } else throw Error
        })
        .catch((err) => {
          showError('Action failed')
        })
      return
    }
    const tmpGrades = grades
    tmpGrades.splice(index, 1)
    setGrades([...tmpGrades])
    const tmpSections = [...sections]
    tmpSections.splice(index, 1)
    setSections([...tmpSections])
    toggleEdit(index)
    showSuccess('action finished successfully')
  }

  function saveGrade(index: number) {
    if ('_id' in grades![index]) {
      gradeService
        .updateGrade(grades![index]._id, grades![index])
        .then((res) => {
          if (res.status === 201) showSuccess('Update finished successfully')
          else throw Error
          toggleEdit(index)
        })
        .catch((err) => {
          showError('Action failed')
        })
    } else {
      gradeService
        .createGrade(props.userID, grades![index])
        .then((res) => {
          if (res.status === 201) {
            let tmp = [...grades]
            tmp[index]._id = res.data._id
            setGrades([...tmp])
            showSuccess('grade added successfully')
            toggleEdit(index)
          } else throw Error
        })
        .catch((err) => {
          if (err?.response?.data?.message.match('sectionId')) {
            showWarning('Section must be selected.')
            return
          }
          showError('Action failed')
        })
    }
  }

  function addGrade(event: any) {
    const tmpGrades = [...(grades as IGrade[])]
    const tmpGrade: Omit<IGrade, '_id'> = {
      sectionId: '',
      testPoints: 0,
      testMaxPoints: 0,
      taskPoints: 0,
      taskMaxPoints: 0,
      projectPoints: 0,
    }
    //@ts-ignore
    tmpGrades.push(tmpGrade)
    setGrades([...tmpGrades])
    let tmpSections = sections
    tmpSections.push({ _id: 'exampleID' })
    setSections([...tmpSections])

    toggleEdit(tmpGrades.length - 1)
  }
  function handleSectionSelection(index: number) {
    return function onSectionSelection(sectionID: string, sectionName: string) {
      closeSectionsModal()
      const tmpGrades = [...grades]
      tmpGrades[index].sectionId = sectionID
      setGrades([...tmpGrades])

      const tmpSections = [...sections]
      tmpSections[index].name = sectionName
      setSections([...tmpSections])
    }
  }

  if (error) return <div className={styles.error}>Something went wrong :(</div>

  if (!isLoaded) return <CircularProgress className={styles.loading} />

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
              <FindSection
                isOpen={isOpenSectionsModal}
                handleClose={closeSectionsModal}
                onSectionSelection={handleSectionSelection(index)}
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
                onConfirm={() => deleteGrade(index)}
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
