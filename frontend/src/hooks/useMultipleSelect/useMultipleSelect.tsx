import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import {
  Container,
  FormControl,
  Input,
  InputLabel,
  Select,
  Theme,
  useTheme,
} from '@material-ui/core'
import styles from './useMultipleSelect.module.css'
import { MenuProps } from '../../components/Menu/Menu'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const menuProps: MenuProps = {
  getContentAnchorEl: null,
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
  transformOrigin: { vertical: 'top', horizontal: 'center' },
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

function getStyles(name: string, selected: string[], theme: Theme) {
  return {
    fontWeight:
      selected.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export interface useMultipleSelectArgs {
  label: string
  options: string[]
  labels?: { [option: string]: string }
}

export default function useMultipleSelect<T extends string = string>({
  options,
  label,
  labels = {},
}: useMultipleSelectArgs): [JSX.Element, T[]] {
  const theme = useTheme()
  const [selected, setSelected] = useState<T[]>([])

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
  ) => {
    setSelected(event.target.value as T[])
  }
  const multipleSelectComponent = (
    <Container>
      <FormControl className={styles.select}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={selected}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => {
            const items = (selected as string[]).length
            return (
              <div>{`Selected ${items} item${items !== 1 ? 's' : ''}`}</div>
            )
          }}
          MenuProps={menuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, selected, theme)}
            >
              {labels[option] ?? option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  )
  return [multipleSelectComponent, selected]
}
