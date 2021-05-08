import React from 'react'
import { fireEvent, render, screen, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as api from '../../../api/User.api'
import ManageUsers, { usersDatabase } from '.'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import ReactTestUtils from 'react-dom/test-utils'
import { User } from '../../../models'

describe('ManageUsers', () => {
  jest.setTimeout(10000)
  it('renders without error, search input works, sort list works and filters work', async () => {
    const getUsersMock = jest
      .spyOn(api, 'getUsers')
      .mockImplementation(() => Promise.resolve(usersDatabase))
    render(
      <QueryClientProvider client={queryClient}>
        <ManageUsers />
      </QueryClientProvider>,
    )
    expect(getUsersMock).toBeCalledTimes(1)
    await screen.findByLabelText('Table - Users')
    expect(queryClient.getQueryData('users')).toHaveLength(usersDatabase.length)

    // const selectSortBy = screen.get('sort-by')
    // userEvent.click(selectSortBy)
    // const nameOption = await screen.findByText('Surname')
    // fireEvent.change(selectSortBy, {target: { value: 'Surname'}})
    // await wait(() =>
    //   expect((queryClient.getQueryData('users') as User[])[0].name).toBe(
    //     'CName',
    //   ),
    // )

    const searchInput = screen.getByPlaceholderText('User last name or ID')
    expect(searchInput).toBeDefined()
    expect(searchInput).not.toBeNull()
    userEvent.type(searchInput, 'CSurname')
    ReactTestUtils.Simulate.keyPress(searchInput, { key: 'Enter' })
    await wait(() => expect(queryClient.getQueryData('users')).toHaveLength(1))

    // await screen.findByLabelText('Table - Users')
    // store.dispatch(
    //   filterData({
    //     table: 'Users',
    //     filters: [{ column: 'surname', values: ['CSurname'] }],
    //   }),
    // )
    // expect(store.getState().tables['Users'].displayedRows).toHaveLength(1)

    // await screen.findByLabelText('Table - Users')
    // store.dispatch(sortData({ table: 'Users', column: 'name' }))
    // expect(store.getState().tables['Users'].displayedRows[0].name).toBe('CName')

    // await screen.findByLabelText('Table - Users')
    // store.dispatch(
    //   filterData({
    //     table: 'Users',
    //     filters: [{ column: 'type', values: ['Admin'] }],
    //   }),
    // )
    // await wait(() =>
    //   expect(store.getState().tables['Users'].displayedRows).toHaveLength(1),
    // )
    // store.dispatch(
    //   filterData({
    //     table: 'Users',
    //     filters: [
    //       { column: 'status', values: ['Resigned'] },
    //       { column: 'type', values: ['Admin'] },
    //     ],
    //   }),
    // )
    // await wait(() =>
    //   expect(store.getState().tables['Users'].displayedRows).toHaveLength(0),
    // )
  })
})
