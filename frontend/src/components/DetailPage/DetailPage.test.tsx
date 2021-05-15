import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import DetailPage from './DetailPage'

describe('DetailPage', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <DetailPage pageName={'egzample'} elementName={'egzample element'} />
      </Provider>,
    )
  })
})
