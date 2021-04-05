import React from 'react';
import styles from './EditableField.module.css';

export interface EditableFieldProps {
  isEdit: boolean,
  fieldName: string,
  fieldValue: string,
  placeholder: string,
  onChange: any,
  textArea?: boolean,
  rows?: number,
  cols?: number
}

const EditableField = (props: EditableFieldProps) => {

  return (
      <div className={styles.manageForm__row}>
        <div className={props.textArea ?
            styles.manageForm__row__key__desc : styles.manageForm__row__key}>
          <label htmlFor={props.fieldName}>{props.fieldName}</label>
        </div>

        <div className={props.textArea ?
            `${styles.manageForm__row__value} ${styles.manageForm__row__value__desc }`
            : styles.manageForm__row__value}>
          { props.isEdit && !props?.textArea ? (
              <input type="text"
                     id={props.fieldName}
                     name={props.fieldName}
                     placeholder={props.placeholder}
                     onChange={props.onChange}/>
          ) : (
              props.isEdit && props?.textArea ? (
                  <textarea
                      id={props.fieldName}
                      name={props.fieldName}
                      rows={props.rows}
                      cols={props.cols}
                      value={props.fieldValue}
                      onChange={props.onChange}/>
              ) : (
                  <p> {props.fieldValue} </p>
              ) )
          }
        </div>
      </div>
  )
}

export default EditableField;
