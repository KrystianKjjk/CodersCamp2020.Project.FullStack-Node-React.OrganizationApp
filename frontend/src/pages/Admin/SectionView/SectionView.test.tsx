import React from 'react'
import { fireEvent, render, screen, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import SectionView from './SectionView'
import { MemoryRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import { ManageSectionData, ProjectDataForSection } from '../../../models'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/sections/1' }),
}))

const projects: ProjectDataForSection[] = [{
  _id: '123',
  projectName: 'CC App',
  sectionId: '1',
}]
const course = {
  _id: '1',
  name: 'CodersCamp 2020',
}
const courses = [course]

const section: ManageSectionData = {
  name: 'React',
  _id: '1',
  course: '1',
  description: 'CC',
  startDate: '1',
  endDate: '2',
}

let mock = new MockAdapter(axios)
mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/projects`)
  .reply(200, projects)

mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/courses`)
  .reply(200, courses)

mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/sections/1`)
  .reply(200, section)

mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/courses/1`)
  .reply(200, course)

mock.onAny().reply(404)

describe('SectionView', () => {
  it('renders without error', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Provider store={store}>
            <SectionView />
          </Provider>
        </MemoryRouter>
      </QueryClientProvider>,
    )
  })

  it('renders without error', async () => {
      const { baseElement } = render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Provider store={store}>
              <SectionView />
            </Provider>
          </MemoryRouter>
        </QueryClientProvider>,
      )
      userEvent.click(await screen.findByText('EDIT'))
      // SAVE
      const inputsBefore = baseElement.querySelectorAll('input')
      await wait(() => expect(inputsBefore).toHaveLength(4))
      // 4 - Section Name, Course Name, Start Date, End Date
      const textareaBefore = baseElement.querySelectorAll('textarea')
      expect(textareaBefore).toHaveLength(2)
      // 2 - Section Description (hidden and normal)
      const buttons = baseElement.querySelectorAll('button')
      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveTextContent('SAVE')
  })
})
