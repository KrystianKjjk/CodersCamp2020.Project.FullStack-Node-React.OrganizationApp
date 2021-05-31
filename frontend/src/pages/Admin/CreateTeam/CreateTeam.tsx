import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { useUsersOfType } from '../../../hooks'

import styles from './CreateTeam.module.css'
import AddButton from '../../../components/AddButton'
import UButton from '../../../components/UButton'

interface Props {
  setIsCreateTeam: Dispatch<SetStateAction<boolean>>
}

export const CreateTeam = ({ setIsCreateTeam }: Props) => {
  const [selectedMentor, setSelectedMentor] = useState('')
  const { data: mentors } = useUsersOfType('Mentor')

  //TODO: change useCreateTeam so it will take mentor data as well
  // TODO: mobile view

  const handleMentorSelection = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedMentor(event.target.value as string)
  }

  return (
    <>
      <h2 className={styles.manageHeader}>Create Team</h2>
      <FormControl variant="outlined">
        <InputLabel id="select-mentor">Select Mentor</InputLabel>
        <Select
          labelId="select-mentor"
          value={selectedMentor}
          onChange={handleMentorSelection}
          className={styles.select}
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
        <AddButton text="CREATE" />
        <UButton
          text="CANCEL"
          onClick={() => {
            setIsCreateTeam(false)
          }}
          color="secondary"
        />
      </div>
    </>
  )
}
