import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import {
  useAppDispatch,
  useAppSelector,
  useCreateTeam,
  useUsersOfType,
} from '../../../hooks'

import styles from './CreateTeam.module.css'
import AddButton from '../../../components/AddButton'
import UButton from '../../../components/UButton'
import { showSnackbar } from '../../../components/Snackbar'

interface Props {
  setIsCreateTeam: Dispatch<SetStateAction<boolean>>
}

const CreateTeam = ({ setIsCreateTeam }: Props) => {
  const dispatch = useAppDispatch()
  const { activeCourse } = useAppSelector((state) => state.courseList)
  const [selectedMentor, setSelectedMentor] = useState('')
  const { data: mentors } = useUsersOfType('Mentor')
  const { mutate: createTeam } = useCreateTeam()

  // TODO: mobile view
  // TODO: add loader (should be a global component)

  const handleMentorSelection = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedMentor(e.target.value as string)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!selectedMentor) {
      return dispatch(
        showSnackbar({ message: 'Please choose a mentor.', severity: 'error' }),
      )
    }

    createTeam(
      {
        courseId: activeCourse?._id || '',
        mentorId: selectedMentor,
      },
      {
        onSuccess: () => {
          setIsCreateTeam(false)
          setSelectedMentor('')
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.manageHeader}>Create Team</h2>
      <FormControl variant="outlined">
        <InputLabel>Select Mentor</InputLabel>
        <Select
          data-testid="select-mentor"
          labelId="select-mentor"
          value={selectedMentor}
          onChange={handleMentorSelection}
          className={styles.select}
          label="Select Mentor"
        >
          {mentors?.map((mentor) => (
            <MenuItem
              value={mentor.id}
              key={mentor.id}
            >{`${mentor.name} ${mentor.surname}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={styles.buttons}>
        <AddButton text="CREATE" type="submit" />
        <UButton
          text="CANCEL"
          onClick={() => {
            setIsCreateTeam(false)
          }}
          color="secondary"
        />
      </div>
    </form>
  )
}

export { CreateTeam }
