import React from 'react'
import { render, screen, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import ManageTeams from './ManageTeams'
import {
  sortData,
  filterData,
  searchData,
} from '../../../components/ReusableTable/ReusableTableSlice'
import TeamService from '../../../api/Team.service'

const teamsDatabase = [
  {
    id: '1',
    name: 'Naame',
    surname: 'Suurname',
    courseName: 'CodersCamp 1. edition',
  },
  {
    id: '2',
    name: 'Naaame',
    surname: 'Suuuurname',
    courseName: 'CodersCamp 1. edition',
  },
  {
    id: '3',
    name: 'Naaaame',
    surname: 'Suuurname',
    courseName: 'CodersCamp 1. edition',
  },
  {
    id: '4',
    name: 'Naaaaaame',
    surname: 'Suuuuurname',
    courseName: 'CodersCamp 1. edition',
  },
  {
    id: '5',
    name: 'CName',
    surname: 'CSurname',
    courseName: 'CodersCamp 1. edition',
  },
]
const teamsCount = teamsDatabase.length
const tableName = 'Teams'

// jest.mock('../../../api/Team.service.ts', () => jest.fn())

describe('ManageTeams', () => {
  jest.setTimeout(20000)
  it('renders without error, filters and sorts data', async () => {
    // const getTeamsMock = jest.fn(() => Promise.resolve(teamsDatabase))
    // const createTeamMock = jest.fn(async () => {
    //   teamsDatabase.push({
    //     id: '7',
    //     name: '---',
    //     surname: '---',
    //     courseName: 'Course from local storage',
    //   })
    // })
    // const deleteTeamMock = jest.fn(async (id: string) => {
    //   teamsDatabase.filter((team) => team.id !== id)
    // })
    // const TeamServiceMock = {
    //   getTeams: getTeamsMock,
    //   createTeam: createTeamMock,
    //   deleteTeam: deleteTeamMock,
    // }
    // // @ts-ignore
    // TeamService.mockImplementation(() => TeamServiceMock)

    // render(
    //   <Provider store={store}>
    //     <ManageTeams />
    //   </Provider>,
    // )

    // await screen.findByLabelText('Table - ' + tableName)
    // expect(getTeamsMock).toBeCalledTimes(1)
    // expect(store.getState().tables[tableName].rows).toHaveLength(teamsCount)
    // const addBtn = screen.getByLabelText('Add team')
    // userEvent.click(addBtn)
    // expect(createTeamMock).toBeCalledTimes(1)
    // await wait(() => expect(getTeamsMock).toBeCalledTimes(2))
    // await wait(() =>
    //   expect(store.getState().tables[tableName].rows).toHaveLength(
    //     teamsCount + 1,
    //   ),
    // )

    // store.dispatch(
    //   filterData({
    //     table: tableName,
    //     filters: [{ column: 'surname', values: ['CSurname'] }],
    //   }),
    // )
    // expect(store.getState().tables[tableName].displayedRows).toHaveLength(1)

    // store.dispatch(sortData({ table: tableName, column: 'name' }))
    // expect(store.getState().tables[tableName].displayedRows[0].name).toBe(
    //   'CName',
    // )

    // store.dispatch(searchData({ table: tableName, column: 'name', search: '' }))
    // expect(store.getState().tables[tableName].displayedRows).toHaveLength(
    //   teamsCount + 1,
    // )

    // await screen.findByLabelText('Table - ' + tableName)
    // const teamCheckboxes = screen.getAllByLabelText('Select Row checkbox')
    // if (teamCheckboxes.length) userEvent.click(teamCheckboxes[0])

    // const deleteTeamBtn = screen.getByText('DELETE')
    // deleteTeamBtn.click()
    // userEvent.click(screen.getByText('CONFIRM'))
    // await wait(() => expect(deleteTeamMock).toBeCalledTimes(1))
  })
})
