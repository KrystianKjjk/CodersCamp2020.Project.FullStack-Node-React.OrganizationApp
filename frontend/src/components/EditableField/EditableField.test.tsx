import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import EditableField from './EditableField'

describe('EditableField', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <EditableField name="EditableField" />
      </Provider>,
    )
  })
})
