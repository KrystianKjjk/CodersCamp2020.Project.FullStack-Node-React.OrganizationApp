import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import UserGrades from './UserGrades'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'

describe('UserGrades', () => {
  it('renders without error', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <UserGrades name="UserGrades" />
        </Provider>
      </QueryClientProvider>,
    )
  })
})
