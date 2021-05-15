import React from 'react'
import HeaderRegistration from './index'
import { render } from '@testing-library/react'

describe('HeaderRegistration', () => {
  it('should render header registration', () => {
    const { container } = render(<HeaderRegistration />)
    expect(container).toMatchSnapshot()
  })
})
