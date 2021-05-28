import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import ReusableTable from './ReusableTable'
import userEvent from '@testing-library/user-event'

const tableName = 'Users Test'
const users = [
  { id: 1, name: 'user1' },
  { id: 2, name: 'user2' },
]
const columns = [
  { field: 'id', width: 100 },
  { field: 'name', width: 100 },
]

describe('ReusableTable', () => {
  it('loads data', async () => {
    const getData = jest.fn(() => Promise.resolve(users))
    render(
      <Provider store={store}>
        <ReusableTable
          name={tableName}
          data={users}
          isFetching={false}
          isLoading={false}
          error={null}
          columns={columns}
        />
      </Provider>,
    )
    const table = await screen.findByLabelText(`Table - ${tableName}`)
    expect(table).toBeInTheDocument()
  })
})
