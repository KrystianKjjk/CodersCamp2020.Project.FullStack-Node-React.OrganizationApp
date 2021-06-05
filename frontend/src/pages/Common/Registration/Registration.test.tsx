import React from 'react'
import { Registration } from './Registration'
import {
  fireEvent,
  render,
  screen,
  waitForElement,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import BaseService from '../../../api/api.service'

//jest.mock('../../../api/api.service', () => jest.fn())

describe('Registration', () => {
  jest.setTimeout(7000)
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <Registration />)
      </Provider>,
    )

    const fnameInput = screen.getByTestId('r-fname')
    const lnameInput = screen.getByTestId('r-lname')
    const emailinput = screen.getByTestId('r-email')
    const passwordInput = screen.getByTestId('r-password')
    const cpasswordInput = screen.getByTestId('r-cpassword')
    const button = screen.getByTestId('r-button')

    expect(fnameInput).toHaveTextContent('Name')
    expect(lnameInput).toHaveTextContent('Surname')
    expect(emailinput).toHaveTextContent('Email Address')
    expect(passwordInput).toBeInTheDocument()
    expect(cpasswordInput).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('sends form data to API service', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Registration />)
      </Provider>,
    )

    const inputFirstNameDiv = screen.getByTestId('r-fname')
    const inputFirstNameElement = inputFirstNameDiv.querySelector(
      'input',
    ) as HTMLElement
    fireEvent.change(inputFirstNameElement, { target: { value: 'Jan' } })

    const inputLastNameDiv = screen.getByTestId('r-lname')
    const inputLastNameElement = inputLastNameDiv.querySelector(
      'input',
    ) as HTMLElement
    fireEvent.change(inputLastNameElement, { target: { value: 'Nowak' } })

    const inputEmailDiv = screen.getByTestId('r-email')
    const inputEmailElement = inputEmailDiv.querySelector(
      'input',
    ) as HTMLElement
    fireEvent.change(inputEmailElement, { target: { value: 'testowy@o2.pl' } })

    const inputPasswordDiv = screen.getByTestId('r-password')
    const inputPasswordElement = inputPasswordDiv.querySelector(
      'input',
    ) as HTMLElement
    fireEvent.change(inputPasswordElement, { target: { value: 'Aaaa1234!' } })

    const inputPasswordConfirmDiv = screen.getByTestId('r-cpassword')
    const inputPasswordConfirmElement = inputPasswordConfirmDiv.querySelector(
      'input',
    ) as HTMLElement
    fireEvent.change(inputPasswordConfirmElement, {
      target: { value: 'Aaaa1234!' },
    })

    const fakePost = jest.spyOn(BaseService, 'post')
    //@ts-ignore

    const button = await screen.getByTestId('r-button')
    button.click()

    expect(fakePost.mock.calls[0]).toEqual([
      'register',
      {
        name: 'Jan',
        surname: 'Nowak',
        email: 'testowy@o2.pl',
        password: 'Aaaa1234!',
        confirmPassword: 'Aaaa1234!',
      },
    ])
  })
})
