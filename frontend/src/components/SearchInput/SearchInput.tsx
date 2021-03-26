import React from 'react';
import styles from './SearchInput.module.css';

export interface SearchInputProps {
  name: string;
}

const SearchInput: React.FC< SearchInputProps > = props => {
  return (
    <div>
      {props.name}
    </div>
  );
};

export default SearchInput;