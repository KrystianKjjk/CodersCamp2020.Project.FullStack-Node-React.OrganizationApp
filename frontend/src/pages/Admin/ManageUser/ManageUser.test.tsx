import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import ManageUser from './ManageUser'
import { QueryClientProvider } from 'react-query'
import queryClient from '../../../QueryClient'
import MockAdapter from 'axios-mock-adapter'
import { User } from '../../../models'
import axios from 'axios'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    userID: 'userid',
  }),
  useRouteMatch: () => ({ url: '/users/userid' }),
}))

let user: User = {
  id: 'userid',
  name: 'UserName',
  surname: 'UserSurname',
  email: 'user@mail.com',
}

let mock = new MockAdapter(axios)

mock.onGet(`${process.env.REACT_APP_API_URL}/api/users/userid`).reply(200, user)
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
