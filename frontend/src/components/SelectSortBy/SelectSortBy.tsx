import React, { useEffect } from 'react'
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import styles from './SelectSortBy.module.css'

export interface SelectSortByProps {
  onChange: (value: string) => void
  options: string[]
  labels?: { [option: string]: string }
  initialValue: string
}

const SelectSortBy: React.FC<SelectSortByProps> = ({
  onChange,
  options,
  labels = {},
  initialValue,
}) => {
  const [value, setValue] = React.useState(initialValue)
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setValue(e.target.value as string)
  }
  useEffect(() => {
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  return (
    <Container>
      <FormControl variant="outlined">
        <InputLabel>Sort by</InputLabel>
        <Select
          className={styles.select}
          onChange={handleChange}
          value={value}
          label="Sort by"
        >
          {options.map((option) => (
            <MenuItem className={styles.select} key={option} value={option}>
              {' '}
              {labels[option] ?? option}{' '}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  )
}

export default SelectSortBy
