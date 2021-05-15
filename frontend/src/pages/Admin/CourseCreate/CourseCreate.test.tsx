import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import CourseCreate from '.'

const mockCreateCourse = jest.fn()
jest.mock('../../../api/courses.service', () => {
  return jest
    .fn()
    .mockImplementation(() => ({ createCourse: mockCreateCourse }))
})

describe('CourseCreator', () => {
  it('should disable submit when course name is empty', () => {
    render(
      <Provider store={store}>
        <CourseCreate />
      </Provider>,
    )

    userEvent.click(screen.getByText('SAVE'))

    expect(mockCreateCourse).not.toHaveBeenCalled()
  })
})
