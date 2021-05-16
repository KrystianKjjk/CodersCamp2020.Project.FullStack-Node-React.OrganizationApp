import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import TeamProjects from './TeamProjects'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import { MemoryRouter } from 'react-router-dom'

const teamProjects = [
  {
    id: 'myTestID',
    Name: 'Star Wars - child project by one of teams',
    Mentor: 'Test Mentor',
    ReferenceProject: 'Star Wars Standard Project',
    Section: 'Javascript',
  },
]

describe('TeamProjects', () => {
  it('renders without error', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Provider store={store}>
            <TeamProjects />
          </Provider>
        </MemoryRouter>
      </QueryClientProvider>,
    )

    const table = await screen.findByLabelText(`Table - Manage Team Projects`)
    //@ts-ignore
    expect(table).toBeInTheDocument()
  })
})
