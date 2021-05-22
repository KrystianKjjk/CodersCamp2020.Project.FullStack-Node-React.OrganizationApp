import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import FindProject from './FindProject'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../QueryClient'

describe('FindSection', () => {
  it('renders without error', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <FindProject
            isOpen={false}
            handleClose={() => {}}
            onSectionSelection={() => {}}
          />
        </Provider>
      </QueryClientProvider>,
    )
  })
})
