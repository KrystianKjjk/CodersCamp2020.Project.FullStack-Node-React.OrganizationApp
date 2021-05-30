import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import ManageGrades from './ManageGrades'
import { IGrade, Section } from '../../../models'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'

const grades: IGrade[] = [
  {
    _id: '123',
    projectPoints: 99,
    sectionId: '1',
    taskMaxPoints: 35,
    taskPoints: 35,
    testMaxPoints: 210,
    testPoints: 200,
  },
]
const section: Section = {
  id: '1',
  name: 'TypeScript',
}

let mock = new MockAdapter(axios)

mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/grades/userID`)
  .reply(200, grades)

mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/sections/1`)
  .reply(200, section)

mock.onAny().reply(200)

describe('ManageGrades', () => {
  it('renders without error', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ManageGrades userID="userID" />
        </Provider>
      </QueryClientProvider>,
    )
  })
})
