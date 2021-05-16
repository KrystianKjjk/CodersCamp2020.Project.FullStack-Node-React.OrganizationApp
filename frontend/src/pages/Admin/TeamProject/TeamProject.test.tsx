import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import TeamProject from './TeamProject'

describe('TeamProject', () => {
  it('renders without error', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
      useParams: jest
        .fn()
        .mockReturnValue({ environment: 'dev', service: 'fakeService' }),
    }))
    render(
      <Provider store={store}>
        <TeamProject />
      </Provider>,
    )
  })

  it('clicking on back triggers a callback function', () => {
    const mockCallback = jest.fn()

    render(
      <Provider store={store}>
        <TeamProject />
      </Provider>,
    )

    const backButton = screen.getByText('Back')
    fireEvent.click(backButton)
    expect(mockCallback).toBeCalledTimes(1)
  })
})
