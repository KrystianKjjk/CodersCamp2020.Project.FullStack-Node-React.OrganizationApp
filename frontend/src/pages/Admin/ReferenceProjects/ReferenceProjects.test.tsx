import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import ReferenceProjects from './ReferenceProjects'
import MockAdapter from 'axios-mock-adapter/types'
import axios from 'axios'

let projects: any[] = []

let mock = new MockAdapter(axios)
mock.onPost(`${process.env.REACT_APP_API_URL}/api/projects`).reply((config) => {
  projects.push(config.data)
  return [200, config.data]
})

mock.onGet(`${process.env.REACT_APP_API_URL}/api/courses`).reply(200, projects)

mock
  .onDelete(new RegExp(`${process.env.REACT_APP_API_URL}/api/projects/*`))
  .reply((config) => {
    if (!config.url) return [400]
    const id = config.url.split('/').slice(-1)[0]
    projects = projects.filter((project) => project._id !== id)
    return [200]
  })

mock.onAny().reply(200)

describe('ReferenceProjects', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <ReferenceProjects />
      </Provider>,
    )
  })
})
