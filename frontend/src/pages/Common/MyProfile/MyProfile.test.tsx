import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import MyProfile from './MyProfile'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'

describe('MyProfile', () => {
  it('renders without error', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MyProfile />
        </Provider>
      </QueryClientProvider>,
    )
  })
})
