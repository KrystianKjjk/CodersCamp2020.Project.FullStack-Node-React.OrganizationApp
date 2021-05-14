import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import SelectSortBy from './SelectSortBy'

describe('SelectSortBy', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <SelectSortBy
          onChange={() => 0}
          options={['opt1', 'opt2']}
          initialValue=""
        />
      </Provider>,
    )
  })
})
