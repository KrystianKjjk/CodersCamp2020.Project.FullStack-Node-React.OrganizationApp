import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import MyProfile from './MyProfile'

describe('MyProfile', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <MyProfile />
      </Provider>,
    )
  })
})
