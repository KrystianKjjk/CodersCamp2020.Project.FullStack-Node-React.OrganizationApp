import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import ManageGrades from './ManageGrades'

describe('ManageGrades', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <ManageGrades userID="123" />
      </Provider>,
    )
  })
})
