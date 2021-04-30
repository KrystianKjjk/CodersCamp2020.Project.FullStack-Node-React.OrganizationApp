import React from 'react'
import styles from './EditableField.module.css'
import UButton from '../UButton'
import { Box } from '@material-ui/core'

export interface EditableFieldProps {
  isEdit: boolean
  isAdding?: boolean
  fieldName: string
  fieldID: string
  fieldValue: string
  placeholder?: string
  onChange?: any
  textArea?: boolean
  modalAction?: any
}

const EditableField = (props: EditableFieldProps) => {
  return (
    <div className={styles.manageForm__row}>
      <div
        className={
          props.textArea
            ? styles.manageForm__row__key__desc
            : styles.manageForm__row__key
        }
      >
        <label htmlFor={props.fieldName}>{props.fieldName}</label>
      </div>

      <div
        className={
          props.textArea
            ? `${styles.manageForm__row__value} ${styles.manageForm__row__value__desc}`
            : styles.manageForm__row__value
        }
      >
        {props.isEdit && !props?.textArea && !props?.modalAction ? (
          <input
            type="text"
            id={props.fieldID}
            name={props.fieldName}
            value={props.fieldValue}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
        ) : props.isEdit && props?.textArea ? (
          <textarea
            id={props.fieldID}
            name={props.fieldName}
            value={props.fieldValue}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
        ) : props.isEdit && props?.modalAction ? (
          <Box display="flex">
            <p style={{ marginRight: '4rem' }}> {props.fieldValue} </p>
            <UButton
              text={props.isAdding ? 'FIND' : 'CHANGE'}
              color="primary"
              onClick={props.modalAction}
            />
          </Box>
        ) : (
          <p> {props.fieldValue} </p>
        )}
      </div>
    </div>
  )
}

export default EditableField
