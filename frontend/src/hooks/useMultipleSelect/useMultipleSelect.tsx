import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import styles from "./useMultipleSelect.module.css";
import { Container } from "@material-ui/core";


export interface useMultipleSelectArgs {
  label: string;
  options: string[];
  labels?: {[option: string]: string;};
}

export default function useMultipleSelect(
  { options, label, labels = {} }: useMultipleSelectArgs
): [ JSX.Element, string[] ] {
  const [selected, setSelected] = useState<string[]>([]);

  const handleFieldChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    event.persist();
    console.log(event.target.value)
    setSelected(event.target.value as string[]);
  };
  const multipleSelectComponent = (
    <Container className={styles.select}>
      <TextField
        className={styles.select}
        select
        name={label}
        id={label}
        variant="outlined"
        label={label}
        value={selected}
        SelectProps={{
          multiple: true,
          value: selected,
          onChange: handleFieldChange
        }}
      >
        {options.map(option => (
          <MenuItem className={styles.select} key={option} value={option}> {labels[option] ?? option} </MenuItem>
        ))}
      </TextField>
    </Container>
  );
  return [multipleSelectComponent, selected];
}
