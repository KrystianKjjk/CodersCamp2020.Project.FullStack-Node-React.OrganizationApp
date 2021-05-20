import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import CourseDetails from './CourseDetails'
import { Course } from '../../../models'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const course: Course = {
  _id: 'courseId',
  name: 'courseName',
  sections: [],
  endDate: new Date().toISOString(),
  startDate: new Date().toISOString(),
}

const props: any = {
  history: jest.fn(),
  location: 'a',
  match: { params: { id: 'courseId' } },
}

let mock = new MockAdapter(axios)
mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/courses/${course._id}`)
  .reply(200, course)
mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/courses/${course._id}/sections`)
  .reply(200, course.sections)

describe('Course', () => {
  it('should not show save button in view mode', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CourseDetails {...props} />
        </Provider>
      </QueryClientProvider>,
    )
    expect(screen.queryByText('SAVE')).not.toBeInTheDocument()
  })

  it('should show save button in edit mode', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CourseDetails {...props} />
        </Provider>
      </QueryClientProvider>,
    )
    const editBtn = await screen.findByText('EDIT')
    userEvent.click(editBtn)
    expect(screen.getByText('SAVE')).toBeInTheDocument()
  })
})
