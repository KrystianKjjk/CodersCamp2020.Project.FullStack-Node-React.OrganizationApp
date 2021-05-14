import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import StyledTextField from './StyledTextField'
import { Provider } from 'react-redux'
import { store } from '../../app/store'

const inputMock = jest.fn()

describe('StyledTextField', () => {
  it('renders without error and change value on input', async () => {
    render(
      <Provider store={store}>
        <StyledTextField onChange={inputMock} defaultValue={'Jan'} />)
      </Provider>,
    )

    const input = (await screen.getByDisplayValue('Jan')) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Kasia' } })
    expect(input.value).toBe('Kasia')
    expect(inputMock.mock.calls).toHaveLength(1)
  })
})
