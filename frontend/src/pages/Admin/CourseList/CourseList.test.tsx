import React from 'react'
import { render, screen, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import CourseList from './CourseList'
import configureStore from 'redux-mock-store'
import * as CourseListSlice from './CourseListSlice'
import { EnhancedStore } from '@reduxjs/toolkit'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockStore = configureStore([])

const courseListElement: CourseListSlice.CourseListElementModel = {
  _id: 'dummyId',
  name: 'dummyName',
  description: 'dummyDescription',
  endDate: new Date().toISOString(),
  startDate: new Date().toISOString(),
}

const initialState = {
  courseList: {
    courseList: [courseListElement],
  },
}

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

let courses: CourseListSlice.CourseListElementModel[] = [courseListElement]

let mock = new MockAdapter(axios)
mock.onPost(`${process.env.REACT_APP_API_URL}/api/courses`).reply((config) => {
  courses.push(config.data)
  return [200, config.data]
})

mock.onGet(`${process.env.REACT_APP_API_URL}/api/courses`).reply(200, courses)

mock
  .onDelete(new RegExp(`${process.env.REACT_APP_API_URL}/api/courses/*`))
  .reply((config) => {
    if (!config.url) return [400]
    const id = config.url.split('/').slice(-1)[0]
    courses = courses.filter((course) => course._id !== id)
    return [200]
  })

mock.onAny().reply(200)

describe('CourseList', () => {
  let store: EnhancedStore<any, any>

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should render course', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CourseList />
        </Provider>
      </QueryClientProvider>,
    )
    expect(await screen.findByText('dummyName')).toBeInTheDocument()
  })

  it('should redirect to create course', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CourseList />
        </Provider>
      </QueryClientProvider>,
    )
    userEvent.click(await screen.findByText('ADD'))

    expect(mockHistoryPush).toBeCalled()
  })

  it('should delete course', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CourseList />
        </Provider>
      </QueryClientProvider>,
    )
    userEvent.click(await screen.findByText('DELETE'))
    userEvent.click(await screen.findByText('CONFIRM'))

    await wait(() => expect(courses).toHaveLength(0))
  })

  it('should redirect to edit course', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CourseList />
        </Provider>
      </QueryClientProvider>,
    )
    userEvent.click(await screen.findByText('EDIT'))

    expect(mockHistoryPush).toBeCalled()
  })

  it('should set active course', async () => {
    //@ts-ignore
    jest.spyOn(CourseListSlice, 'setActiveCourse')

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CourseList />
        </Provider>
      </QueryClientProvider>,
    )
    userEvent.click(await screen.findByTestId('course-list-element'))

    await wait(() => expect(CourseListSlice.setActiveCourse).toBeCalled())
  })
})
