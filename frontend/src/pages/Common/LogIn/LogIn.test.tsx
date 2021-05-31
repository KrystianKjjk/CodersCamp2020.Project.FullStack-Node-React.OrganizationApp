import React from 'react'
import LogIn from './LogIn'
import {
  fireEvent,
  render,
  screen,
  act,
  waitForElement,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import BaseService from '../../../api/api.service'


describe('LogIn', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <LogIn />)
      </Provider>,
    )

    const emailinput = screen.getByTestId('li-email')
    const passwordInput = screen.getByTestId('li-password')
    const button = screen.getByTestId('li-button')

    expect(emailinput).toHaveTextContent('Email Address')
    expect(passwordInput).toHaveTextContent('Password')
    expect(button).toBeInTheDocument()
  })

  it('sends form data to API service', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <LogIn />)
      </Provider>,
    )

    const inputEmailDiv = screen.getByTestId('li-email')
    const inputEmailElement = inputEmailDiv.querySelector('input')
    fireEvent.change(inputEmailElement, { target: { value: 'testowy@o2.pl' } })

    const inputPasswordDiv = screen.getByTestId('li-password')
    const inputPasswordElement = inputPasswordDiv.querySelector('input')
    fireEvent.change(inputPasswordElement, { target: { value: 'Aaaa1234!' } })

    const fakePost = jest.spyOn(BaseService, 'post')

    const button = await screen.getByTestId('li-button')

    button.click()

    expect(fakePost.mock.calls[0]).toEqual([
      'login',
      { email: 'testowy@o2.pl', password: 'Aaaa1234!' },
    ])
  })
})
