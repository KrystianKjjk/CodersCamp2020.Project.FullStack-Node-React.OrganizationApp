import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import DeleteButton from './DeleteButton'

describe('DeleteButton', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <DeleteButton
          confirmTitle="Example title"
          confirmContent="Example confirm text"
          onConfirm={() => console.log('Confirm clicked')}
          onClose={() => console.log('Close clicked')}
        />
      </Provider>,
    )
  })
})
