import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import CourseCreate from '.'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Course } from '../../../models'

const courses: Course[] = []

let mock = new MockAdapter(axios)
mock
  .onPost(`${process.env.REACT_APP_API_URL}/api/courses`)
  .reply((config) => {
    courses.push(config.data)
    return [200, config.data]
  })

mock.onGet(`${process.env.REACT_APP_API_URL}/api/courses`).reply(200, courses)

mock.onAny().reply(200)

describe('CourseCreator', () => {
  it('should disable submit when course name is empty', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CourseCreate />
        </Provider>
      </QueryClientProvider>
    )

    userEvent.click(screen.getByText('SAVE'))

    expect(courses).toHaveLength(0)
  })
})
