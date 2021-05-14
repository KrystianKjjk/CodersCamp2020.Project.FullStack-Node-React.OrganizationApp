import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import CourseList from './CourseList'
import configureStore from 'redux-mock-store'
import * as CourseListSlice from './CourseListSlice'
import { EnhancedStore } from '@reduxjs/toolkit'

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

describe('CourseList', () => {
  let store: EnhancedStore<any, any>

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('should render course', () => {
    //@ts-ignore
    jest.spyOn(CourseListSlice, 'fetchCoursesAsync').mockImplementation(() => ({
      type: 'Test',
    }))

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>,
    )
    expect(screen.getByText('dummyName')).toBeInTheDocument()
  })

  it('should redirect to create course', () => {
    //@ts-ignore
    jest.spyOn(CourseListSlice, 'fetchCoursesAsync').mockImplementation(() => ({
      type: 'Test',
    }))

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>,
    )
    userEvent.click(screen.getByText('ADD'))

    expect(mockHistoryPush).toBeCalled()
  })

  it('should delete course', () => {
    //@ts-ignore
    jest.spyOn(CourseListSlice, 'fetchCoursesAsync').mockImplementation(() => ({
      type: 'Test',
    }))

    //@ts-ignore
    jest.spyOn(CourseListSlice, 'deleteCourseAsync').mockImplementation(() => ({
      type: 'Test',
    }))

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>,
    )
    userEvent.click(screen.getByText('DELETE'))
    userEvent.click(screen.getByText('CONFIRM'))

    expect(CourseListSlice.deleteCourseAsync).toBeCalled()
  })

  it('should redirect to edit course', () => {
    //@ts-ignore
    jest.spyOn(CourseListSlice, 'fetchCoursesAsync').mockImplementation(() => ({
      type: 'Test',
    }))

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>,
    )
    userEvent.click(screen.getByText('EDIT'))

    expect(mockHistoryPush).toBeCalled()
  })

  it('should set active course', () => {
    //@ts-ignore
    jest.spyOn(CourseListSlice, 'fetchCoursesAsync').mockImplementation(() => ({
      type: 'Test',
    }))

    //@ts-ignore
    jest.spyOn(CourseListSlice, 'setActiveCourse').mockImplementation(() => ({
      type: 'Test',
    }))

    render(
      <Provider store={store}>
        <CourseList />
      </Provider>,
    )
    userEvent.click(screen.getByTestId('course-list-element'))

    expect(CourseListSlice.setActiveCourse).toBeCalled()
  })
})
