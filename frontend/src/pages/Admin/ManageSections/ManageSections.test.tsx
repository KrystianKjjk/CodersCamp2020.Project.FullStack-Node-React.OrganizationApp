import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import ManageSections from './ManageSections'
import { MemoryRouter } from 'react-router-dom'
import { ManageSection } from '../../../models'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

let sections: ManageSection[] = []

let mock = new MockAdapter(axios)
mock.onPost(`${process.env.REACT_APP_API_URL}/api/sections`).reply((config) => {
  sections.push(config.data)
  return [200, config.data]
})

mock.onGet(`${process.env.REACT_APP_API_URL}/api/sections`).reply(200, sections)

mock
  .onDelete(new RegExp(`${process.env.REACT_APP_API_URL}/api/sections/*`))
  .reply((config) => {
    if (!config.url) return [400]
    const id = config.url.split('/').slice(-1)[0]
    sections = sections.filter((section) => section.id !== id)
    return [200]
  })

mock.onAny().reply(200)

describe('ManageSections', () => {
  it('renders without error', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ManageSections />
        </Provider>
      </QueryClientProvider>,
    )
  })

  it('clicking on button add direct to new section form', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Provider store={store}>
            <ManageSections />
          </Provider>
        </MemoryRouter>
      </QueryClientProvider>,
    )

    const button = screen.getByText('ADD')
    fireEvent.click(button)
    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(mockHistoryPush).toHaveBeenCalledWith('/sections/create')
  })
})
