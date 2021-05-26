import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import TeamProjects from './TeamProjects'
import { QueryClientProvider, QueryClient } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { TeamProjectDto } from '../../../api/TeamProjects.api'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('TeamProjects', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  const teamProjectsData: TeamProjectDto[] = [
    {
      id: 'myTestID',
      teamProjectName: 'Star Wars - child project by one of teams',
      mentorName: 'Test Mentor',
      mentorId: 'qwerty',
      referenceProjectId: '98765',
      referenceProjectName: 'Star Wars Standard Project',
      sectionId: '12345',
      sectionName: 'Javascript',
    },
  ]

  var mock = new MockAdapter(axios)
  mock
    .onGet(`${process.env.REACT_APP_API_URL}/api/teams/projects`)
    .reply(200, teamProjectsData)

  it('is a table after data are loaded', async () => {
    localStorage.setItem('activeCourse', JSON.stringify({ _id: '12344' }))
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Provider store={store}>
            <TeamProjects />
          </Provider>
        </MemoryRouter>
      </QueryClientProvider>,
    )
    const table = await screen.findByLabelText('Table - Team projects')
    //@ts-ignore
    localStorage.removeItem('activeCourse')
    expect(table).toBeInTheDocument()
  })
})
