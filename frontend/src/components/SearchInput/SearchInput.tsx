import React, { createRef, useEffect, useState } from 'react';
import styles from './SearchInput.module.css';
import { InputAdornment, IconButton, FormControl, OutlinedInput } from '@material-ui/core';
import { ArrowForwardOutlined, SearchRounded } from '@material-ui/icons';


export interface SearchInputProps {
  onSubmit: (value: string) => void;
  placeholder: string;
}

const SearchInput: React.FC< SearchInputProps > = ({ placeholder, onSubmit }) => {
  const [value, setValue] = useState('');
  const inputRef = createRef<HTMLInputElement>();
  const handleSubmit: React.MouseEventHandler = () => {
    setValue(inputRef.current.value);
  };
  const onKeyPress: React.KeyboardEventHandler = (e) => {
    if(e.key === 'Enter')
      setValue(inputRef.current.value);
  }
  useEffect(() => {
    onSubmit(value);
  }, [value]);
  return (
    <FormControl variant="outlined">
      <OutlinedInput
        inputRef={inputRef}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        startAdornment={<InputAdornment position="start"><SearchRounded /></InputAdornment>}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label='arrow button'
              onClick={handleSubmit}
              edge="end"
            >
              <ArrowForwardOutlined />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchInput;