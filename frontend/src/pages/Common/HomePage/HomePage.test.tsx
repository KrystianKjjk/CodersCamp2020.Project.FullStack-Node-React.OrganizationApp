import React from 'react'
import { render } from '@testing-library/react'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('should render home page', () => {
    const { container } = render(<HomePage />)
    expect(container).toMatchSnapshot()
  })
})
