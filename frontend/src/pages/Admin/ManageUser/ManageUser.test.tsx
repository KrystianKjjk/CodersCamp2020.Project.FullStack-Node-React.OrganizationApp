import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import ManageUser from './ManageUser'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import MockAdapter from 'axios-mock-adapter'
import { IGrade, Section, UserData, UserStatus, UserType } from '../../../models'
import axios from 'axios'

const userID = 'userid'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    userID,
  }),
  useRouteMatch: () => ({ url: `/users/${userID}` }),
}))

let user: UserData = {
  _id: userID,
  name: 'UserName',
  surname: 'UserSurname',
  email: 'user@mail.com',
  grades: [],
  status: UserStatus.Active,
  type: UserType.Participant,
}



let mock = new MockAdapter(axios)

mock.onGet(`${process.env.REACT_APP_API_URL}/api/users/${userID}`).reply(200, user)

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

mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/grades/${userID}`)
  .reply(200, grades)

mock
  .onGet(`${process.env.REACT_APP_API_URL}/api/sections/1`)
  .reply(200, section)

mock.onAny().reply(200)

describe('ManageUser', () => {
  it('renders without error', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ManageUser />
        </Provider>
      </QueryClientProvider>,
    )
  })
})
