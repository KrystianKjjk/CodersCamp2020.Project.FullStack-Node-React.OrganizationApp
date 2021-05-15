import React from 'react'
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import styles from './SelectSortBy.module.css'
import { useDidUpdateEffect } from '../../hooks'

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
  useDidUpdateEffect(() => {
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  return (
    <Container>
      <FormControl variant="outlined">
        <InputLabel>Sort by</InputLabel>
        <Select
          data-testid="sort-by"
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

export default React.memo(SelectSortBy)
