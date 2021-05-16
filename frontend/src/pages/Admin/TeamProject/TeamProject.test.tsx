import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import TeamProject from './TeamProject'
import { QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import queryClient from '../../../QueryClient'

describe('TeamProject', () => {
  it('renders without error', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
      useParams: jest.fn().mockReturnValue({ teamProjectId: '12345' }),
    }))
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Provider store={store}>
            <TeamProject />
          </Provider>
        </MemoryRouter>
      </QueryClientProvider>,
    )
  })

  it('clicking on back triggers a callback function', () => {
    const mockCallback = jest.fn()

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Provider store={store}>
            <TeamProject />
          </Provider>
        </MemoryRouter>
      </QueryClientProvider>,
    )

    const backButton = screen.getByText('Save')
    fireEvent.click(backButton)
    expect(mockCallback).toBeCalledTimes(1)
  })
})
