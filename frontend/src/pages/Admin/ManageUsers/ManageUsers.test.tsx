import React from 'react'
import { render, screen, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as api from '../../../api/User.api'
import ManageUsers, { usersDatabase } from '.'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import ReactTestUtils from 'react-dom/test-utils'
import { invUserStatusDict, invUserTypeDict, User } from '../../../models'
import { sortUsers, filterUsers } from '../../../hooks'

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

    sortUsers('name')
    await wait(() =>
      expect((queryClient.getQueryData('users') as User[])[0].name).toBe(
        'CName',
      ),
    )

    const searchInput = screen.getByPlaceholderText('User last name or ID')
    expect(searchInput).toBeDefined()
    expect(searchInput).not.toBeNull()
    userEvent.type(searchInput, 'CSurname')
    ReactTestUtils.Simulate.keyPress(searchInput, { key: 'Enter' })
    await wait(() => expect(queryClient.getQueryData('users')).toHaveLength(1))

    await filterUsers({ type: [], status: [] })
    await filterUsers({ type: [invUserTypeDict['Admin']], status: [] })
    await wait(() => expect(queryClient.getQueryData('users')).toHaveLength(1))

    await filterUsers({
      status: [invUserStatusDict['Resigned']],
      type: [invUserTypeDict['Admin']],
    })
    await wait(() => expect(queryClient.getQueryData('users')).toHaveLength(0))
  })
})
