import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import FindModal from './FindModal'

interface ITest {
  id: string
}

describe('FindModal', () => {
  it('renders without error', () => {
    const onSelection = jest.fn()
    const columns = [{ field: 'id', width: 100 }]
    const data = [{ id: '1' }]
    let open = false
    render(
      <Provider store={store}>
        <FindModal<ITest>
          name="TestModal"
          onRowSelection={onSelection}
          columns={columns}
          //@ts-ignore
          query={{data, error: null, isLoading: false, isFetching: false}}
          queryKey='TestQuery'
          handleOpen={() => (open = true)}
          handleClose={() => (open = false)}
          open={open}
          searchBy="id"
        />
      </Provider>,
    )
  })
})
