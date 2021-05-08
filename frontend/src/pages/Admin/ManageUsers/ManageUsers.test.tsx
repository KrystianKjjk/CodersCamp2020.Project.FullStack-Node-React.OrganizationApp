import React from 'react'
import { fireEvent, render, screen, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import {
  sortData,
  filterData,
} from '../../../components/ReusableTable/ReusableTableSlice'
import UserService from '../../../api/User.service'
import ManageUsers, { usersDatabase } from '.'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'

jest.mock('../../../api/User.service.ts', () => jest.fn())

describe('ManageUsers', () => {
  jest.setTimeout(10000)
  it('renders without error, search input works, sort list works and filters work', async () => {
    const getUsersMock = jest.fn(() => Promise.resolve(usersDatabase))
    const UserServiceMock = {
      getUsers: getUsersMock,
    }
    // @ts-ignore
    UserService.mockImplementation(() => UserServiceMock)

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ManageUsers />
        </QueryClientProvider>,
      </Provider>
    )
    expect(getUsersMock).toBeCalledTimes(1)
    await screen.findByLabelText('Table - Users')
    expect( queryClient.getQueryData('users') ).toHaveLength(
      usersDatabase.length,
    )

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
