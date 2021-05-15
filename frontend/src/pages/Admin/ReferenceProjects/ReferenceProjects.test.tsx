import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import ReferenceProjects from './ReferenceProjects'

describe('ReferenceProjects', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <ReferenceProjects />
      </Provider>,
    )
  })
})
