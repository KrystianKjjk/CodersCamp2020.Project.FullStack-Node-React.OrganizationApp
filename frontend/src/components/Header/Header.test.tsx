import React from 'react'
import Header from './index'
import { render } from '@testing-library/react'
import * as Hooks from '../../hooks/hooks'
import { CourseListElementModel } from '../../pages/Admin/CourseList/CourseListSlice'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

const courseListElement: CourseListElementModel = {
  _id: 'dummyId',
  name: 'dummyName',
  description: 'dummyDescription',
  endDate: new Date(),
  startDate: new Date(),
}

describe('Header', () => {
  it('should render header', () => {
    jest
      .spyOn(Hooks, 'useAppSelector')
      .mockReturnValue({ activeCourse: courseListElement })

    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    )
    expect(container).toMatchSnapshot()
  })
})
