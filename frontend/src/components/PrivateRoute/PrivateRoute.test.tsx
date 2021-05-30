import React from 'react'
import { render } from '@testing-library/react'
import PrivateRoute from './PrivateRoute'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from '../../app/store'
import { Provider } from 'react-redux'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../QueryClient'

describe('PrivateRoute', () => {
  it('renders properly', () => {
    const DummyComponent = () => {
      return <h2>Dummy component</h2>
    }
    const { container } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <PrivateRoute path="/">
              <DummyComponent />
            </PrivateRoute>
          </Router>
        </QueryClientProvider>
      </Provider>,
    )
    expect(container).toMatchSnapshot()
  })
})
