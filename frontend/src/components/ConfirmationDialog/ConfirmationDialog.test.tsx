import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import ConfirmationDialog from './ConfirmationDialog'

describe('ConfirmationDialog', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <ConfirmationDialog
          isOpen={true}
          onClose={() => {}}
          handleCancel={() => {}}
          handleConfirm={() => {}}
        />
      </Provider>,
    )
  })
})
