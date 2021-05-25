import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import TeamProject from './TeamProject'
import { QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import queryClient from '../../../QueryClient'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import routeData from 'react-router'

describe('TeamProject', () => {
  const exampleTeamProject = {
    _id: '6042af0f06ad6350dcdaee27',
    teamId: null,
    parentProjectId: {
      _id: '60774edb7cb92200156f43e2',
      sectionId: {
        startDate: '2021-03-13T13:05:00.000Z',
        materials: [],
        _id: '6076dae6aa05930015915ead',
        name: 'HTML',
        endDate: '2021-04-15T12:05:00.000Z',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Consectetur purus ut faucibus pulvinar elementum integer enim neque. At tellus at urna condimentum. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Natoque penatibus et magnis dis. Tempus iaculis urna id volutpat. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Tortor condimentum lacinia quis vel eros donec ac. Tincidunt lobortis feugiat vivamus at augue eget arcu. Sem fringilla ut morbi tincidunt augue interdum velit euismod in. Hendrerit gravida rutrum quisque non tellus orci. Nisl purus in mollis nunc sed id semper. Et malesuada fames ac turpis egestas sed tempus urna et. Amet aliquam id diam maecenas ultricies mi.',
        course: '604bd56eef20be4368273700',
        tests: [],
      },
      projectName: 'Portfolio',
      projectUrl: 'url',
      description: 'HTML reference project',
      createdAt: '2021-04-14T20:21:47.260Z',
      updatedAt: '2021-04-28T18:43:07.131Z',
    },
    projectName: 'testfullproject123',
    projectUrl: 'testurl.com elooo',
    description: 'LOREM IPSUM ELO edd',
    createdAt: '2021-03-05T22:22:07.764Z',
    updatedAt: '2021-05-13T17:13:08.715Z',
  }
  beforeEach(() => {
    jest
      .spyOn(routeData, 'useParams')
      .mockReturnValue({ teamProjectId: '6042af0f06ad6350dcdaee27' })
  })
  var mock = new MockAdapter(axios)
  mock
    .onGet(
      `${process.env.REACT_APP_API_URL}/teams/projects/6042af0f06ad6350dcdaee27`,
    )
    .reply(200, exampleTeamProject)

  it('renders without error', () => {
    // render(
    //   <QueryClientProvider client={queryClient}>
    //     <MemoryRouter>
    //       <Provider store={store}>
    //         <TeamProject />
    //       </Provider>
    //     </MemoryRouter>
    //   </QueryClientProvider>,
    // )
  })

  it('clicking on back triggers a callback function', () => {
    // const mockCallback = jest.fn()
    // render(
    //   <QueryClientProvider client={queryClient}>
    //     <MemoryRouter>
    //       <Provider store={store}>
    //         <TeamProject />
    //       </Provider>
    //     </MemoryRouter>
    //   </QueryClientProvider>,
    // )
    // const backButton = screen.getByText('Edit')
    // fireEvent.click(backButton)
    // expect(mockCallback).toBeCalledTimes(1)
  })
})
