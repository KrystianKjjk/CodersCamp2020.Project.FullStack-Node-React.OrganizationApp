import React, { useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import styles from './SelectSortBy.module.css';

export interface SelectSortByProps {
  onChange: (value: string) => void;
  options: string[];
  initialValue: string;
}

const SelectSortBy: React.FC< SelectSortByProps > = ({ onChange, options, initialValue }) => {
  const [value, setValue] = React.useState(initialValue);
  const handleChange = (e: React.ChangeEvent<{value: unknown}>) => {
    setValue(e.target.value as string);
  };
  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <FormControl>
        <InputLabel>Sort by</InputLabel>
        <Select
          className={styles.select}
          onChange={handleChange}
          value={value}
        >
          {options.map(option => (<MenuItem className={styles.select} key={option} value={option}>{option}</MenuItem>))}
        </Select>
      </FormControl>
  );
};

export default SelectSortBy;