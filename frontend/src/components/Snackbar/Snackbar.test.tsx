import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import Snackbar from './Snackbar'

describe('Snackbar', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <Snackbar />
      </Provider>,
    )
  })
})
