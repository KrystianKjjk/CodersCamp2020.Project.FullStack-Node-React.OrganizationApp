import React, { useEffect, useState } from 'react'
import { Backdrop, CssBaseline, Fade, Modal } from '@material-ui/core'

import ReusableTable from '../ReusableTable'
import SearchInput from '../SearchInput'

import styles from './FindModal.module.css'
import { UseQueryResult } from 'react-query'
import { genericSearch } from '../../hooks/useQuery/useGenericQuery'


interface FindModalProps<T> {
  onRowSelection: any
  query: UseQueryResult<T[]>
  columns: { field: string; width: number; fieldName?: string }[]
  searchPlaceholder?: string
  searchBy: keyof T
  name: string
  queryKey: string
  open: boolean
  handleClose: () => void
  handleOpen: () => void
}

const FindModal = <T extends unknown>(
  props: FindModalProps<T>,
) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    props.handleOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    genericSearch<T>(props.queryKey)(`${props.searchBy}` as keyof T, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  function onSearch(name: string) {
    setSearch(name)
  }

  function handleRowClick(params: any, e: any) {
    props.onRowSelection(params.row)
    props.handleClose()
  }

  return (
    <>
      <CssBaseline />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={styles.container}>
            <div className={styles.container__header}>
              <span>{props.name}</span>
            </div>

            <div className={styles.container__body}>
              <div className={styles.container__body__search}>
                <SearchInput
                  onSubmit={onSearch}
                  placeholder={props.searchPlaceholder ?? ''}
                />
              </div>
              <div className={styles.container__body__table}>
                <ReusableTable
                  name={props.name}
                  data={props.query.data}
                  isLoading={props.query.isLoading}
                  isFetching={props.query.isFetching}
                  error={props.query.error}
                  columns={props.columns}
                  onRowClick={handleRowClick}
                />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default FindModal