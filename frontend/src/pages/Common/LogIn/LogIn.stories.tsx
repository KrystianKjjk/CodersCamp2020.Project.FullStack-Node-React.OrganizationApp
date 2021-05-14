import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import LogIn from './LogIn'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import { StyledTextFieldProps } from '../../../components/StyledTextField/StyledTextField'

export default {
  title: 'LogIn component',
  component: LogIn,
} as Meta

const Template: Story<StyledTextFieldProps> = (args) => (
  <Provider store={store}>
    <LogIn {...args} />
  </Provider>
)

export const FirstInput = Template.bind({})
FirstInput.args = {
  label: 'Write something: ',
}
