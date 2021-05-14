import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import StyledTextField, { StyledTextFieldProps } from './StyledTextField'
import { Provider } from 'react-redux'
import { store } from '../../app/store'

export default {
  title: 'StyledTextField component',
  component: StyledTextField,
} as Meta

const Template: Story<StyledTextFieldProps> = (args) => (
  <Provider store={store}>
    <StyledTextField {...args} />
  </Provider>
)

export const FirstInput = Template.bind({})
FirstInput.args = {
  label: 'Write something: ',
}
