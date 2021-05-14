import React from 'react'
import { render, screen, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReactTestUtils from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import SearchInput from './SearchInput'

describe('SearchInput', () => {
  it('should call onSubmit after submit when input value is changed', async () => {
    const onSubmit = jest.fn<string, any>()
    render(
      <Provider store={store}>
        <SearchInput onSubmit={onSubmit} placeholder="Search" />
      </Provider>,
    )
    const input = await screen.findByRole('textbox')
    const arrow = screen.getByLabelText('arrow button')
    const sampleStr: string = 'Query'

    // Type something and click arrow
    userEvent.type(input, sampleStr)
    userEvent.click(arrow)
    await wait(() => expect(onSubmit).toBeCalledTimes(1))
    expect(onSubmit).toBeCalledWith(sampleStr)

    // Type something and press enter
    userEvent.type(input, sampleStr + 'x')
    ReactTestUtils.Simulate.keyPress(input, { key: 'Enter' })
    await wait(() => expect(onSubmit).toBeCalledTimes(2))
    expect(onSubmit).toBeCalledWith(sampleStr + 'x')
  })
})
