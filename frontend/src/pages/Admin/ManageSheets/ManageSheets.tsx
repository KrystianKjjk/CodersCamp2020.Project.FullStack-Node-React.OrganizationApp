import React, { useRef, useState } from 'react'
import styles from './ManageSheets.module.css'
import AddButton from '../../../components/AddButton'
import SelectSortBy from '../../../components/SelectSortBy'
import SearchInput from '../../../components/SearchInput'
import Table from '../../../components/ReusableTable'
import {
  fetchData,
  searchData,
  sortData,
} from '../../../components/ReusableTable/ReusableTableSlice'
import { useAppDispatch } from '../../../app/hooks'
import { Container, CssBaseline, Paper } from '@material-ui/core'
import SheetService from '../../../api/Sheet.service'
import { GridSelectionModelChangeParams } from '@material-ui/data-grid'
import UButton from '../../../components/UButton'
import { useHistory } from 'react-router-dom'
import ConfirmationDialog from '../../../components/ConfirmationDialog'

export interface ManageSheetsProps {}

const ManageSheets: React.FC<ManageSheetsProps> = () => {
  const api = new SheetService()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const selectedSheets = useRef([] as string[])
  const [isOpen, setIsOpen] = useState(false)

  const tableName = 'Sheets'

  const changeSortBy = (value: string) => {
    dispatch(sortData({ table: tableName, column: value }))
  }

  const changeSearch = (value: string) => {
    const searchQuery = {
      table: tableName,
      column: /^[0-9a-fA-F]{1,16}$/.test(value) ? 'id' : 'mentorSurname',
      search: value,
    }
    dispatch(searchData(searchQuery))
  }

  const sortByOptions = ['mentorName', 'mentorSurname', 'projectName']
  const sortByLabels = {
    mentorName: 'Mentor name',
    mentorSurname: 'Mentor surname',
    projectName: 'Project name',
  }
  const columns = [
    {
      field: 'mentorSurname',
      headerName: 'Mentor surname',
      width: 200,
      sortable: true,
    },
    {
      field: 'mentorName',
      headerName: 'Mentor name',
      width: 150,
      sortable: true,
    },
    {
      field: 'projectName',
      headerName: 'Project name',
      width: 250,
      sortable: true,
    },
  ]

  const handleAddClick = async () => {
    await api.createSheet()
    dispatch(fetchData(tableName, api.getSheets))
  }

  const handleSheetSelection = (params: GridSelectionModelChangeParams) => {
    selectedSheets.current = params.selectionModel as string[]
  }

  const deleteSelectedSheets = () => {
    selectedSheets.current.forEach((sheetId) => {
      api.deleteSheet(sheetId)
    })
    setTimeout(() => dispatch(fetchData(tableName, api.getSheets)), 300)
    selectedSheets.current = []
    setIsOpen(false)
  }

  const handleRowClick = (data: { id: string | number }) => {
    history.push(`/gradesheets/${data.id}`)
  }

  const handleOpenDeleteConfirmation = () => {
    setIsOpen(true)
  }

  const handleCloseDeleteConfirmation = () => {
    setIsOpen(false)
  }

  return (
    <Container className={styles.manageSheets} aria-label="Manage Sheets">
      <ConfirmationDialog
        title="Are you sure you want to delete this grade sheet?"
        content="This action is irreversible."
        isOpen={isOpen}
        onClose={handleCloseDeleteConfirmation}
        handleConfirm={deleteSelectedSheets}
        handleCancel={handleCloseDeleteConfirmation}
      />
      <CssBaseline />
      <Paper className={styles.mainHeader}>
        <h2>Sheets</h2>
        <span className={styles.searchInput}>
          <SearchInput
            onSubmit={changeSearch}
            placeholder="Search by ID or mentor surname"
          />
        </span>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Manage Sheets</h2>
          <div className={styles.buttons}>
            <AddButton
              text="Add"
              onClick={handleAddClick}
              aria-label="Add sheet"
            />
            <UButton
              text="Delete"
              color="secondary"
              onClick={handleOpenDeleteConfirmation}
            />
          </div>
          <span className={styles.selectSortBy}>
            <SelectSortBy
              onChange={changeSortBy}
              initialValue=""
              options={sortByOptions}
              labels={sortByLabels}
            />
          </span>
        </div>
        <div className={styles.table}>
          <Table
            name={tableName}
            columns={columns}
            getData={api.getSheets}
            onSelectionModelChange={handleSheetSelection}
            checkboxSelection
            onRowClick={handleRowClick}
          />
        </div>
      </Paper>
    </Container>
  )
}

export default ManageSheets
